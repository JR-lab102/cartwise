#!/bin/bash

# CartWise API Smoke Test
# Tests basic API endpoints to verify the server is running correctly

BASE_URL="${BASE_URL:-http://localhost:3000}"
PASS_COUNT=0
FAIL_COUNT=0

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to test an endpoint
# Usage: test_endpoint "METHOD" "PATH" "EXPECTED_STATUS" ["BODY"]
test_endpoint() {
    local method="$1"
    local path="$2"
    local expected_status="$3"
    local body="$4"
    local url="${BASE_URL}${path}"

    echo -n "Testing ${method} ${path}... "

    if [ -n "$body" ]; then
        response=$(curl -s -w "\n%{http_code}" -X "$method" \
            -H "Content-Type: application/json" \
            -d "$body" \
            "$url" 2>/dev/null)
    else
        response=$(curl -s -w "\n%{http_code}" -X "$method" "$url" 2>/dev/null)
    fi

    # Extract status code (last line)
    status_code=$(echo "$response" | tail -n1)
    response_body=$(echo "$response" | sed '$d')

    if [ "$status_code" = "$expected_status" ]; then
        echo -e "${GREEN}PASS${NC} (Status: $status_code)"
        ((PASS_COUNT++))
        return 0
    else
        echo -e "${RED}FAIL${NC} (Expected: $expected_status, Got: $status_code)"
        echo "  Response: $response_body"
        ((FAIL_COUNT++))
        return 1
    fi
}

# Function to test GET endpoint
test_get() {
    local path="$1"
    local expected_status="${2:-200}"
    test_endpoint "GET" "$path" "$expected_status"
}

# Function to test POST endpoint
test_post() {
    local path="$1"
    local body="$2"
    local expected_status="${3:-201}"
    test_endpoint "POST" "$path" "$expected_status" "$body"
}

# Function to test PUT endpoint
test_put() {
    local path="$1"
    local body="$2"
    local expected_status="${3:-200}"
    test_endpoint "PUT" "$path" "$expected_status" "$body"
}

# Function to test DELETE endpoint
test_delete() {
    local path="$1"
    local expected_status="${2:-200}"
    test_endpoint "DELETE" "$path" "$expected_status"
}

echo "=========================================="
echo "CartWise API Smoke Test"
echo "Base URL: $BASE_URL"
echo "=========================================="
echo ""

# Test GET endpoints

echo "--- GET Endpoints ---"

# Test 1: Get all products
test_get "/api/products" 200

# Test 2: Search products with query
test_get "/api/products?q=oat" 200

# Test 3: Get product by ID
test_get "/api/products/prod-1" 200

# Test 4: Get product alternatives
test_get "/api/products/prod-1/alternatives" 200

# Test 5: Get preferences
test_get "/api/preferences" 200

# Test 6: Get saved products (requires session_key)
test_get "/api/saved?session_key=test-session" 200

echo ""
echo "--- Write Endpoints ---"

# Test 7: Save a product (POST)
test_post "/api/saved" '{"session_key":"smoke-test-$(date +%s)","product_id":"prod-1"}' 201

# Test 8: Update preferences (PUT)
test_put "/api/preferences" '{"priority_factors":[{"factor":"high_protein","importance":8,"rank":1}],"excluded_allergens":["soy"]}' 200

echo ""
echo "=========================================="
echo "Test Results"
echo "=========================================="
echo -e "Passed: ${GREEN}$PASS_COUNT${NC}"
echo -e "Failed: ${RED}$FAIL_COUNT${NC}"
echo ""

if [ $FAIL_COUNT -eq 0 ]; then
    echo -e "${GREEN}All tests passed!${NC}"
    exit 0
else
    echo -e "${RED}Some tests failed!${NC}"
    exit 1
fi
