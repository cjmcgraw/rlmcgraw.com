#!/bin/bash

# Site Health Check for rlmcgraw.com
set -e

DOMAIN="rlmcgraw.com"
EXPECTED_IP="34.54.125.121"
ERRORS=0

echo "=== Site Health Check for $DOMAIN ==="
echo

# DNS Resolution
echo "1. Checking DNS..."
RESOLVED_IP=$(dig +short $DOMAIN | head -n1)
if [ "$RESOLVED_IP" = "$EXPECTED_IP" ]; then
    echo "✓ DNS resolves correctly to $EXPECTED_IP"
else
    echo "✗ DNS ERROR: Resolves to $RESOLVED_IP instead of $EXPECTED_IP"
    echo "  FIX: Check DNS records in Google Cloud DNS:"
    echo "  gcloud dns record-sets list --zone=zone1"
    echo "  gcloud dns record-sets create $DOMAIN. --zone=zone1 --type=A --ttl=300 --rrdatas=$EXPECTED_IP"
    ERRORS=$((ERRORS + 1))
fi
echo

# HTTPS Certificate
echo "2. Checking HTTPS certificate..."
SSL_CHECK=$(echo | openssl s_client -servername $DOMAIN -connect $DOMAIN:443 2>/dev/null | openssl x509 -noout -dates 2>/dev/null)
if [ $? -eq 0 ]; then
    echo "✓ SSL certificate is valid"
    echo "$SSL_CHECK"
else
    echo "✗ SSL ERROR: Certificate check failed"
    echo "  FIX: Check certificate status:"
    echo "  gcloud compute ssl-certificates describe rlmcgraw-cert --global"
    echo "  If PROVISIONING, wait 10-20 minutes"
    echo "  If failed, recreate:"
    echo "  gcloud compute ssl-certificates create rlmcgraw-cert --domains=$DOMAIN,www.$DOMAIN --global"
    ERRORS=$((ERRORS + 1))
fi
echo

# HTTP to HTTPS Redirect
echo "3. Checking HTTP redirect..."
HTTP_REDIRECT=$(curl -s -o /dev/null -w "%{http_code}" -L http://$DOMAIN 2>/dev/null || echo "000")
REDIRECT_LOCATION=$(curl -s -o /dev/null -w "%{redirect_url}" http://$DOMAIN 2>/dev/null)
if [[ "$REDIRECT_LOCATION" == "https://$DOMAIN"* ]]; then
    echo "✓ HTTP redirects to HTTPS correctly"
else
    echo "✗ HTTP REDIRECT ERROR: Not redirecting to HTTPS"
    echo "  FIX: Update HTTP proxy to use redirect URL map:"
    echo "  gcloud compute target-http-proxies update webapp-lb-target-proxy --url-map=http-redirect --global"
    ERRORS=$((ERRORS + 1))
fi
echo

# HTTPS Response
echo "4. Checking HTTPS response..."
HTTPS_STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://$DOMAIN 2>/dev/null || echo "000")
if [ "$HTTPS_STATUS" = "200" ]; then
    echo "✓ HTTPS returns 200 OK"
else
    echo "✗ HTTPS ERROR: Status code $HTTPS_STATUS"
    if [ "$HTTPS_STATUS" = "403" ]; then
        echo "  FIX: Make bucket public:"
        echo "  gsutil iam ch allUsers:objectViewer gs://rlmcgraw-webapp-files/"
    else
        echo "  FIX: Check load balancer configuration:"
        echo "  gcloud compute url-maps describe webapp-lb --global"
        echo "  gcloud compute backend-buckets describe webapp-origin --global"
    fi
    ERRORS=$((ERRORS + 1))
fi
echo

# Index.html Content
echo "5. Checking index.html content..."
INDEX_CONTENT=$(curl -s https://$DOMAIN 2>/dev/null)
if [[ "$INDEX_CONTENT" == *"<html>"* ]] && [[ "$INDEX_CONTENT" == *"bundle.js"* ]]; then
    echo "✓ index.html loads correctly"
else
    echo "✗ CONTENT ERROR: index.html not loading properly"
    echo "  FIX: Check if files exist in bucket:"
    echo "  gsutil ls gs://rlmcgraw-webapp-files/"
    echo "  gsutil cat gs://rlmcgraw-webapp-files/index.html"
    echo "  Re-deploy if missing:"
    echo "  gsutil -m rsync -r -d dist/ gs://rlmcgraw-webapp-files/"
    ERRORS=$((ERRORS + 1))
fi
echo

# JavaScript Bundle
echo "6. Checking JavaScript bundles..."
MAIN_JS=$(curl -s -o /dev/null -w "%{http_code}" https://$DOMAIN/main.bundle.js 2>/dev/null || echo "000")
if [ "$MAIN_JS" = "200" ]; then
    echo "✓ JavaScript bundles accessible"
else
    echo "✗ JS ERROR: Cannot load JavaScript bundles (status $MAIN_JS)"
    echo "  FIX: Check if JS files exist:"
    echo "  gsutil ls gs://rlmcgraw-webapp-files/*.js"
    echo "  Rebuild and redeploy via GitHub:"
    echo "  git push to trigger cloudbuild.yaml"
    ERRORS=$((ERRORS + 1))
fi
echo

# Console Errors Check
echo "7. Checking for console errors..."
echo "  Manual check required: Open https://$DOMAIN in browser and check console"
echo "  Common fix for JSX errors:"
echo "  - Edit tsconfig.json: change \"jsx\": \"react-jsxdev\" to \"jsx\": \"react-jsx\""
echo "  - Commit and push to trigger rebuild via cloudbuild.yaml"
echo

# Summary
echo "=== SUMMARY ==="
if [ $ERRORS -eq 0 ]; then
    echo "✓ All checks passed! Site is healthy."
else
    echo "✗ Found $ERRORS errors. Run the fix commands above."
    echo
    echo "Common troubleshooting commands:"
    echo "  gcloud compute forwarding-rules list --global"
    echo "  gcloud compute target-https-proxies list --global"
    echo "  gcloud compute url-maps describe webapp-lb --global"
    echo "  gcloud compute backend-buckets describe webapp-origin --global"
fi

exit $ERRORS
