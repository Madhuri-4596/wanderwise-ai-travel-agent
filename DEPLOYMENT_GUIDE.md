# Oracle Cloud Deployment Guide for Luno Travel Agent

This guide will help you deploy your AI Travel Agent to Oracle Cloud's Always Free Tier and connect it to `lunotravelagent.in`.

## Step 1: Create Oracle Cloud Account

1. Go to [Oracle Cloud](https://www.oracle.com/cloud/free/)
2. Click "Start for free"
3. Fill in your details:
   - Email address
   - Country/Territory
   - First and Last Name
4. Verify your email
5. Complete account setup (you'll need a credit card for verification, but won't be charged)
6. Choose your home region (closest to your target audience - e.g., Mumbai for India)

## Step 2: Create a Free Tier VM Instance

1. Log in to Oracle Cloud Console
2. Click **Menu** → **Compute** → **Instances**
3. Click **Create Instance**
4. Configure your instance:
   - **Name**: `luno-travel-agent`
   - **Placement**: Keep default
   - **Image**: Ubuntu 22.04 (recommended)
   - **Shape**:
     - Click "Change Shape"
     - Select **VM.Standard.E2.1.Micro** (Always Free eligible)
     - 1 OCPU, 1GB RAM
   - **Networking**:
     - Create new VCN or use existing
     - Assign a public IPv4 address ✅
   - **SSH Keys**:
     - Save private key (download .key file) - IMPORTANT!
     - Or paste your own public key

5. Click **Create**
6. Wait 2-3 minutes for provisioning
7. **Note down the Public IP address** - you'll need this!

## Step 3: Configure Firewall Rules

### Oracle Cloud Security List
1. Go to **Networking** → **Virtual Cloud Networks**
2. Click your VCN → **Security Lists** → **Default Security List**
3. Click **Add Ingress Rules** and add:

**Rule 1 - HTTP:**
- Source CIDR: `0.0.0.0/0`
- IP Protocol: TCP
- Destination Port: 80

**Rule 2 - HTTPS:**
- Source CIDR: `0.0.0.0/0`
- IP Protocol: TCP
- Destination Port: 443

**Rule 3 - Custom (Next.js):**
- Source CIDR: `0.0.0.0/0`
- IP Protocol: TCP
- Destination Port: 3000

## Step 4: Connect to Your VM

### On Windows (using Git Bash or WSL):

```bash
# Navigate to where you saved the private key
cd ~/Downloads

# Set permissions (if using WSL/Git Bash)
chmod 400 ssh-key-*.key

# Connect to your VM (replace with your actual IP and key filename)
ssh -i ssh-key-*.key ubuntu@YOUR_PUBLIC_IP
```

### First time connection:
- Type `yes` when asked about fingerprint

## Step 5: Initial Server Setup

Once connected to your VM, run these commands:

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20 (LTS)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version  # Should show v20.x.x
npm --version

# Install PM2 (process manager)
sudo npm install -g pm2

# Install Nginx (web server)
sudo apt install -y nginx

# Install Git
sudo apt install -y git
```

## Step 6: Configure Ubuntu Firewall

```bash
# Allow SSH (important!)
sudo ufw allow 22/tcp

# Allow HTTP and HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Allow Next.js (temporary, for testing)
sudo ufw allow 3000/tcp

# Enable firewall
sudo ufw enable

# Check status
sudo ufw status
```

## Step 7: Clone and Setup Your Project

```bash
# Create application directory
sudo mkdir -p /var/www/travel-agent
sudo chown -R ubuntu:ubuntu /var/www/travel-agent

# Clone your repository (if using Git)
cd /var/www/travel-agent
git clone YOUR_REPO_URL .

# Or upload files using SCP from your local machine:
# scp -i ssh-key-*.key -r /mnt/c/Users/Dell/pdf/ai-travel-agent/* ubuntu@YOUR_IP:/var/www/travel-agent/
```

## Step 8: Install Dependencies and Build

```bash
cd /var/www/travel-agent

# Install dependencies
npm install

# Create environment variables file
nano .env.local
```

**Add your environment variables:**
```env
NEXTAUTH_SECRET=your_secret_key_here
NEXTAUTH_URL=http://lunotravelagent.in
OPENAI_API_KEY=your_openai_key
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
# Add all other required env variables
```

Press `Ctrl+X`, then `Y`, then `Enter` to save.

```bash
# Build the Next.js application
npm run build

# Test if it works
npm start
```

Visit `http://YOUR_PUBLIC_IP:3000` to test. Press `Ctrl+C` to stop.

## Step 9: Setup PM2 for Production

```bash
# Start the app with PM2
cd /var/www/travel-agent
pm2 start npm --name "travel-agent" -- start

# Configure PM2 to start on boot
pm2 startup systemd
# Copy and run the command it gives you (starts with sudo)

# Save current PM2 process list
pm2 save

# Check status
pm2 status
pm2 logs travel-agent
```

## Step 10: Configure Nginx Reverse Proxy

```bash
# Create Nginx configuration
sudo nano /etc/nginx/sites-available/travel-agent
```

**Paste this configuration:**
```nginx
server {
    listen 80;
    server_name lunotravelagent.in www.lunotravelagent.in YOUR_PUBLIC_IP;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/travel-agent /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test Nginx configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx

# Enable Nginx to start on boot
sudo systemctl enable nginx
```

## Step 11: Configure Domain DNS

Go to your domain registrar (where you bought `lunotravelagent.in`):

1. Find DNS Settings/DNS Management
2. Add/Edit these records:

**A Record:**
- Type: A
- Name: @ (or leave blank)
- Value: YOUR_ORACLE_VM_PUBLIC_IP
- TTL: 3600

**WWW Record:**
- Type: A (or CNAME)
- Name: www
- Value: YOUR_ORACLE_VM_PUBLIC_IP (or @ if CNAME)
- TTL: 3600

**Wait 10-30 minutes for DNS propagation**

## Step 12: Install SSL Certificate (HTTPS)

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate (replace with your actual domain)
sudo certbot --nginx -d lunotravelagent.in -d www.lunotravelagent.in

# Follow prompts:
# - Enter email address
# - Agree to terms
# - Choose to redirect HTTP to HTTPS (option 2)

# Test auto-renewal
sudo certbot renew --dry-run

# Certificate auto-renews every 90 days
```

## Step 13: Final Checks

```bash
# Check PM2 status
pm2 status

# Check Nginx status
sudo systemctl status nginx

# Check application logs
pm2 logs travel-agent

# Monitor resources
htop  # Press q to quit
```

## Your Site Should Now Be Live!

Visit: `https://lunotravelagent.in`

## Useful Commands

```bash
# Restart application
pm2 restart travel-agent

# View logs
pm2 logs travel-agent

# Stop application
pm2 stop travel-agent

# Restart Nginx
sudo systemctl restart nginx

# Check Nginx errors
sudo tail -f /var/log/nginx/error.log

# Update your code
cd /var/www/travel-agent
git pull
npm install
npm run build
pm2 restart travel-agent
```

## Troubleshooting

**Can't connect to VM:**
- Check Oracle Cloud security lists (ports 22, 80, 443)
- Check Ubuntu firewall: `sudo ufw status`

**Site not loading:**
- Check PM2: `pm2 status`
- Check Nginx: `sudo systemctl status nginx`
- Check logs: `pm2 logs travel-agent`

**DNS not working:**
- Wait 30 minutes for propagation
- Check DNS: `nslookup lunotravelagent.in`
- Verify A record points to correct IP

**SSL certificate issues:**
- Ensure domain DNS is propagated first
- Check Nginx config: `sudo nginx -t`
- Check Certbot logs: `sudo certbot certificates`

## Monitoring & Maintenance

```bash
# Set up monitoring with PM2
pm2 install pm2-logrotate

# Check disk space
df -h

# Check memory usage
free -h

# Update system regularly
sudo apt update && sudo apt upgrade -y
```

## Cost: $0/month

Everything above uses Oracle's Always Free Tier, which includes:
- 2 VMs (we're using 1)
- 1GB RAM each
- Free forever (no time limit)

Your only cost is the domain name (~$10-15/year).

---

Need help? Check the logs and status commands above, or let me know what error you're seeing!
