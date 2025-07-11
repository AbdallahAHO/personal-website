---
# SEO-optimized (for search engines)
seoTitle: "Practical Guide to Home Labs with ThinkCentre, Coolify & Cloudflare Tunnels"
seoDescription: "Discover how built a powerful home lab using a refurbished Lenovo ThinkCentre, Coolify, and Cloudflare Tunnels. A budget-friendly guide for developers and homelab enthusiasts."
seoTags: ["Abdallah Othman", "homelab", "self-hosting", "coolify", "cloudflare tunnels", "home server", "thinkcentre", "docker", "linux", "refurbished hardware", "hamburg developer"]

# User-facing (elegant and classy)
title: "From Cloud to Shelf: My Self-Hosting Journey with an old PC, Coolify & Cloudflare"
description: "How I ditched cloud hosting, built a powerful home lab, and took full control of my personal projects — all on a budget."
tags: ["homelab", "self-hosting", "docker", "coolify"]

pubDate: 2025-07-12
slug: "self-hosting-hetzner-coolify"
image: {
   url: "/images/blog/thinkpad.png",
   alt: "Lenovo ThinkCentre M720Q used for home server"
}
---
> A practical guide to building a home lab with a refurbished ThinkCentre M720Q, Coolify, and Cloudflare Tunnels - saving money while gaining complete control

## The €150/Year Wake-Up Call

So I was sitting with my coffee one morning, looking at my Hetzner invoice, when it hit me. I was paying around [€150 per year for a VPS](https://www.hetzner.com/cloud) that was... fine. Just fine. But here's the thing - for the same money, I could own actual hardware that would be way more powerful.

You know that moment when you realize you've been solving the wrong problem? Yeah, that was me with cloud hosting for personal projects.

## The Black Friday Hunt

Back in November, Black Friday rolled around, and I did what any self-respecting engineer does - I went bargain hunting on Amazon. And there it was: a [Lenovo ThinkCentre M720Q Tiny Mini PC](https://psref.lenovo.com/syspool/Sys/PDF/ThinkCentre/ThinkCentre_M720_Tiny/ThinkCentre_M720_Tiny_Spec.pdf) for €90. Originally priced around €150, this little beast came with:

- [Intel Core i5-8500T processor](https://www.intel.com/content/www/us/en/products/sku/129941/intel-core-i58500t-processor-9m-cache-up-to-3-50-ghz/specifications.html) (6 cores!)
- 8GB RAM (officially supports up to 32GB)
- 128GB SSD with room for another
- Two RAM slots for future upgrades
- Smaller than my coffee maker

To be honest, I was worried it would be broken. Used electronics from Amazon? That's a gamble. But when it arrived, it was surprisingly well-maintained - cleaned up, functioning SSD, and ready to go. The refurbishment was solid.

### The Upgrade Dance

Here's where it gets interesting. The RAM was on sale during Black Friday - €50 for 32GB. So for a total of €140, I had a machine that would cost me years of Hetzner hosting. The math was simple: one-time €140 investment versus €150 every single year.

The upgrade process? Dead simple:
1. Pop open the case (no tools needed - Lenovo knows what they're doing)
2. Slide in the RAM - took maybe 10 minutes
3. Add a second SSD for redundancy
4. Done in under 30 minutes

## Setting Up: A Weekend Well Spent

The whole setup took me a weekend, tops. Let me break it down:

**Hardware Assembly**: Less than 2 hours
- Unboxing and inspection: 20 minutes
- RAM upgrade: 10 minutes
- SSD installation: 10 minutes
- Cable management (just Ethernet + power): 5 minutes

**Software Setup**: Around 1.5 hours
- [Ubuntu Server installation](https://ubuntu.com/tutorials/install-ubuntu-server) via USB: 30 minutes
- Initial configuration and updates: 30 minutes
- [Coolify](https://coolify.io/) installation with setup tunnels and all: 20 minutes
- First containers running: 10 minutes

The beauty? You only need two cables - Ethernet and power. HDMI is optional unless you're troubleshooting. I went with Ethernet over WiFi because, let's be frank, stability matters more than cable aesthetics when you're running services 24/7.

## Enter Coolify: My Personal Heroku

If you haven't heard of [Coolify](https://coolify.io/), think of it as your own personal Heroku. It's been a game changer for me. Here's what it handles out of the box:

- [Docker](https://docs.docker.com/engine/install/) orchestration
- Automatic SSL certificates ([Let's Encrypt](https://letsencrypt.org/getting-started/))
- Service discovery
- One-click deployments
- Git integration with push-to-deploy
- Automatic security updates (they just added this!)

The SSH setup? Already secured out of the box with key-based authentication. No passwords, no nonsense. And the recent update that adds automatic patching from the UI? That's peace of mind right there.

## The Security Dilemma (And My Solution)

Here's where I hit my first real challenge. My server is sitting in my home network behind my router. How do I expose services to the internet without turning my home into a hacker's playground?

Port forwarding on my router? That's basically putting a "hack me" sign on ports 80 and 443. No thanks.

Enter **[Cloudflare Tunnels](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/)**. This was the game changer for me. Instead of exposing my home IP:
- The tunnel creates a secure connection FROM my server TO Cloudflare
- Only the services I explicitly expose are accessible
- DDoS protection included (for free!)
- I can kill access instantly from the Cloudflare dashboard

And yes, it's completely free. Cloudflare is basically subsidizing my entire security infrastructure.

### The Nuclear Option

One fun thing I did - I installed a [smart plug](https://www.ikea.com/de/de/p/tretakt-steckdose-smart-80540349/) on the server's power cord. Cost me €8, but now if someone decides to have fun with my services while I'm away from home, I can literally pull the plug from my phone. Physical security at its finest!

## What's Actually Running After a Year?

Almost a year later, here's my stack:

**Development Tools**:
- **[Mailpit](https://mailpit.axllent.org/)**: Mailpit - email & SMTP testing tool with API for developers (no more console.log debugging!)
- **[Browserless](https://www.browserless.io)**: Headless Chrome API for automation
- **[Hoppscotch](https://hoppscotch.io/)**: Self-hosted API testing (think Postman, but mine)
- **[OpenWebUI](https://github.com/open-webui/open-webui)**: My own ChatGPT interface

**Productivity Apps**:
- **[Excalidraw](https://github.com/excalidraw/excalidraw)**: Whiteboard for architecture diagrams
- **[Karakeep](https://karakeep.app/)**: Very smart OSS Bookmark manager (goodbye Raindrop.io subscription!)
- **[Pi-hole](https://pi-hole.net/)**: Network-wide ad blocking (this alone is worth it)

**Monitoring & Management**:
- **[Portainer](https://www.portainer.io/)**: When I need to dig deeper than Coolify allows
- **[Glances](https://github.com/nicolargo/glances)**: Think htop but with a web UI - shows CPU, RAM, and crucially, temperature
- **[Dazzle](https://dozzle.dev/)**: Container log aggregation
- **[Speedtest Tracker](https://github.com/alexjustesen/speedtest-tracker)**: Runs every 30 minutes, gives me charts to argue with my ISP about the quality of their service

## The Reality Check

Let me be honest about the downsides:

### The Fan Noise
There's a fan. It makes noise. In winter, with CPU temps under 50°C, it's a subtle hum you can barely hear. In summer, when I'm running more containers, it gets more noticeable. My solution? I moved it from my bedroom to the living room bookshelf. Problem solved.

### Power Consumption
Based on my calculations (10-15W idle, up to 35W under load), running 24/7 costs about €3/month in electricity. That's €36/year - still way cheaper than cloud hosting.

### No CPU Upgrades
Once you buy it, that's your CPU forever. The i5-8500T has been more than enough for my needs (I'm running 20+ containers), but if you're planning to run AI workloads locally, look at newer models with better specs.

## Remote Management That Actually Works

The setup gives me multiple management layers:
- **Coolify Dashboard**: Handles 90% of what I need
- **SSH + Terminal**: For when I need to get surgical
- **[Discord Webhooks](https://discord.com/developers/docs/resources/webhook)**: Notifications when containers fail or need attention
- **Smart Plug**: The nuclear option - remote power cycling when all else fails

I've set up automatic notifications through Discord (it's cross-platform, works on my phone and laptop). When something goes wrong, I know about it immediately.

## One Year Later: The Numbers

Let's talk economics. Here's my total cost breakdown:
- **Initial Hardware**: €140 (ThinkCentre + RAM upgrade)
- **Electricity (1 year)**: ~€36
- **Smart Plug**: €15
- **Total First Year**: €191

Compare that to cloud hosting:
- **[Hetzner CPX11](https://www.hetzner.com/cloud#pricing)** (2 vCPU, 2GB RAM): €150/year
- **My Setup**: 6 cores, 32GB RAM, unlimited storage

I have 16x the RAM and 3x the CPU cores for basically the same annual cost. But beyond the economics:
- No surprise shutdowns in almost a year of 24/7 operation
- Routine reboots every 20 days (my choice, not necessity)
- Complete control over my data
- No bandwidth limits or surprise bills
- Learning experience that cloud abstracts away

## Should You Do This?

If you're running personal projects, development environments, or small services - absolutely. Here's my buying checklist based on what I've learned:

**Minimum Specs I'd Recommend**:
- 8GB RAM (16GB better for Docker-heavy workloads)
- 128GB SSD (enough for 10-20 containers easily)
- Intel i5 6th gen or newer (for power efficiency)
- Gigabit Ethernet port

**What to Check When Buying Used**:
- BIOS isn't locked (ask the seller specifically)
- All mounting hardware included
- Power adapter included (these can be proprietary and expensive)
- Who did the refurbishment (manufacturer refurb > random shop)

## The Bigger Picture

Moving from cloud to home hosting taught me something important: we've become too dependent on abstractions. Yes, AWS and Hetzner solve real problems, but for personal projects? You're paying for convenience you might not need.

My little ThinkCentre sitting in my bookshelf has become my playground. Want to try a new service? Deploy it in minutes. Want to experiment with networking? Go wild. Want to learn about infrastructure? No AWS bill anxiety hanging over your head.

Is it perfect? No. Would I run production services on it? Also no. But for everything else? It's been transformative.

## Looking Ahead

So yeah, that's how I turned a Black Friday impulse buy into a year-long journey of self-hosting. My Hetzner account? Cancelled within a month. My learning? Through the roof. My coffee? Still brewing while my containers deploy.

The best part? I'm no longer renting compute power - I own it. And in this age of subscription everything, that feels pretty good.

What's your take on home labs? Are you still paying for cloud hosting for personal projects, or have you taken the plunge into self-hosting? I'd love to hear about your setup in the comments.

## Resources & References

- [Coolify](https://coolify.io) - The self-hosting platform that makes this all possible
- [Cloudflare Tunnels Documentation](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/) - For secure access without port forwarding
- [ThinkCentre Tiny Enthusiasts](https://www.reddit.com/r/homelab) - Where I learned most of the hardware tricks
- [ServeTheHome Mini PC Reviews](https://www.servethehome.com/tag/lenovo/) - Detailed benchmarks and comparisons