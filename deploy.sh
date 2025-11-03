#!/bin/bash

# Deployment script for Luno Travel Agent on Oracle Cloud
# Run this script on your Oracle Cloud VM after initial setup

set -e  # Exit on any error

echo "Starting deployment for Luno Travel Agent..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

APP_DIR="/var/www/travel-agent"
APP_NAME="travel-agent"

# Check if running as correct user
if [ "$USER" != "ubuntu" ]; then
    echo -e "${YELLOW}Warning: This script should be run as ubuntu user${NC}"
fi

# Update code from Git (if using Git)
echo -e "${GREEN}Pulling latest code...${NC}"
cd $APP_DIR
if [ -d .git ]; then
    git pull origin main
else
    echo -e "${YELLOW}Not a git repository. Skipping git pull.${NC}"
fi

# Install/update dependencies
echo -e "${GREEN}Installing dependencies...${NC}"
npm install

# Build the application
echo -e "${GREEN}Building application...${NC}"
npm run build

# Restart the application with PM2
echo -e "${GREEN}Restarting application...${NC}"
pm2 restart $APP_NAME

# Save PM2 configuration
pm2 save

# Show status
echo -e "${GREEN}Deployment complete! Current status:${NC}"
pm2 status

echo -e "${GREEN}To view logs, run: pm2 logs $APP_NAME${NC}"
