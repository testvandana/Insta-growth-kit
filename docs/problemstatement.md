
Problem Statement: Insta Growth Kit
1. The problem I want to solve
I often see small businesses post product photos or Instagram Reels, but a good-looking
post does not automatically turn into a customer enquiry. People comment things like
"PRICE," "LINK," "kitne ka hai?" or "link pls," and the shop owner may miss the
comment, reply too late, or lose track of who was interested.
As a learner, I want to understand how an actual AI-powered project is built, not just copy
code or generate a demo screen. I want to take one real product from photo -> ad -> Reel
-> Instagram comment -> private reply -> follow-up conversation -> recorded lead, and
make the whole experience work for a shop.
My challenge: Can I build a low-cost Insta Growth Kit that helps a small business create a
Reel ad and respond to interested commenters safely, while teaching myself how to plan,
code, connect APIs, test, deploy, and explain a real project using Cursor or Antigravity?
2. What I am going to build
I will create an end-to-end kit for one real product:
1. Product ad assets: Turn 3-5 original phone photos into three styled product ad
images, keeping the actual label, logo, colours, and product details accurate. Add
owner-approved price/offer text and create an AI voiceover.
2. Instagram Reel: Make and publish a 15-second Reel with a strong opening hook,
product, offer, and "comment PRICE" call to action. Review the Reel's Insights after
at least 48 hours.
3. Comment-to-DM automation: Build and deploy a small bot that checks comments
on my Reel and sends one private reply for an eligible comment asking for a price
or link.
4. AI-assisted understanding: Recognize variations in English, Hindi, and Hinglish (for
example, "rate?" and "kitne ka hai?") instead of relying only on exact keywords.
Ignore spam/abuse.
5. Follow-up answers and lead capture: Answer permitted follow-up questions using
only shop-approved facts, hand unknown questions to the owner, and save leads in a
Google Sheet.
6. Shop handover: Package the ad images, Reel, bot, lead sheet, and a short owner
guide into a kit that somebody else can operate.
The experience I want to demonstrate
Original product photos
|
v
Three accurate ad images + offer + voiceover
|
v
15-second Instagram Reel with "Comment PRICE" CTA
|
v
Customer comments: "PRICE" / "link pls" / "kitne ka hai?"
|
v
My deployed bot detects and classifies the comment
|
+--> Ineligible / abuse / duplicate --> No private reply
|
v
One eligible private reply with approved price or product link
|
v
Customer asks a follow-up question
|
+--> Known answer in shop fact card --> Helpful answer
|
+--> Unknown or uncertain --> Hand over to shop owner
|
v
Lead recorded in Google Sheets for the owner
3. Why I am using Cursor or Antigravity
I am learning to build the code and integrations with an AI coding assistant, rather than
being expected to write everything from memory. I will use Cursor or Antigravity to:
● Break a large project into small, understandable tasks.
● Generate and explain starter code for the comment checker, comment classifier,
Instagram API integration, follow-up handling, and Google Sheets integration.
● Help connect environment variables, deploy a Cloudflare Worker, read errors, and fix
failing tests.
● Write sample test comments, validate edge cases, and document what I have built.
My rule: I will ask the assistant to explain each major file, function, API call, and change. I
will test each feature before moving on. AI-generated code is a starting point, not proof that
the system works.
Important: Cursor/Antigravity will help me build the automation/software. I can still use the
phone-first apps from the project plan to produce the creative assets. I do not need to build
my own image editor, video editor, or a complex dashboard.
4. My target users
● Primary user: A local shop owner or small creator who wants to turn Reel
engagement into enquiries without manually chasing every comment.
● Customer: Someone who comments on the Reel to ask for a price, link, or product
detail and expects a timely, relevant response.
● Me, the learner: Someone who wants a working portfolio project and hands-on
practice with AI tools, APIs, automation, testing, and deployment.
5. What my project must do
A. Create honest product ads
● Work with one real product and 3-5 phone photos.
● Produce three styled ad images and ad layouts suitable for 9:16 and 1:1 formats.
● Keep real packaging, brand elements, colours, and product claims unchanged.
● Use price and offer information approved by the owner; AI must not invent prices
or discounts.
● Prepare a roughly 15-second AI voiceover and a clear call to action.
B. Publish a Reel and learn from results
● Assemble a 15-second, watermark-free Reel with a hook in the first two seconds,
product, offer, and comment CTA.
● Publish from an eligible public Instagram professional account.
● After at least 48 hours, collect views, watch time, shares, and saves through
Instagram Insights.
● Identify three specific improvements I would make to the next Reel.
C. Detect and respond to comments
● Connect my Instagram professional account through a Meta developer app and the
applicable Instagram API permissions.
● Deploy a Cloudflare Worker that checks for new Reel comments on a one-minute
schedule, as outlined in the course plan.
● Identify requests for price or link, including natural English, Hindi, and Hinglish
variations.
● Sort comments into price request, link request, question, praise, or spam/abuse.
● Send the approved price/link in one private reply per eligible comment, avoiding
duplicates, abuse, and blocked terms/users.
● Follow the course plan's safeguards for comment-triggered replies, including the
stated seven-day eligibility window. Confirm the currently applicable Meta rules
before using the live API.
D. Answer follow-ups and capture leads
● Use a short, shop-owner-approved fact card for product details such as sizes,
delivery, timings, and location.
● Never guess an answer. If information is missing or uncertain, respond that the
owner will reply shortly and flag the enquiry for human follow-up.
● Respect the applicable Instagram messaging window; the source plan teaches a
24-hour response window after a customer message. Verify current platform
requirements before deployment.
● Record each lead in Google Sheets, including at least the person's name/identifier
as available, what they asked, and when they asked it.
● Avoid unnecessary personal information and keep credentials and access tokens
private.
E. Make the kit usable after I finish
● Prepare a one-page shop-owner handover explaining what the kit does, how to
change a price/offer, how to view leads, and what requires maintenance.
● Get written permission before publishing work for a business. Clearly disclose
paid/sponsored content where required.
● Document how to check bot health and refresh Instagram access credentials
before expiry, following current platform guidance.
6. My beginner-friendly build milestones
Milestone What I learn by building Working output / proof
1. The Ad
Image
Work from real requirements,
improve product imagery with AI,
verify accuracy, write ad copy and
voiceover
Three finished ad images, price
sticker, voiceover file, shop/page
name, before-and-after image
2. The Reel Plan a short ad, publish it,
understand real engagement data
Public 15-second Reel link, Insights
screenshot taken 48+ hours later,
three improvement ideas
3. The DM
Bot
Read API documentation, configure
credentials, write and deploy a
Worker, classify comments, handle
edge cases
Screen recording of a real comment
triggering a private reply; at least 25
correct classifications out of 30
test comments
4. The
Complete
Kit
Use shop-approved facts for AI
replies, connect Google Sheets,
handle failures, document handover
60-90 second end-to-end demo,
screenshot of the lead sheet with at
least 10 rows, one-page handover
I will complete these milestones in order. When I get stuck, I can run test cases against a
small part of the system before connecting everything.
7. Tools and suggested implementation
These tools follow the source cohort plan; Cursor or Antigravity is my main environment
for the coding work.
Part of the project Tool(s)
Product image generation/editing Gemini app; Canva for layout and offer text
AI voiceover Google AI Studio speech generation
Reel editing Instagram Edits app
Publishing and performance Instagram professional account and Insights
Coding and debugging Cursor or Antigravity
Instagram comment and messaging
integration
Meta developer app and Instagram API
Bot hosting and scheduling Cloudflare Workers and a one-minute Cron
Trigger
AI comment classification / approved
responses
Gemini API
Lead capture Google Sheets and Apps Script
Owner documentation Google Docs, Canva, or Markdown
Suggested code modules (learning aid, not a mandated folder structure):
● commentFetcher - finds new Reel comments.
● commentClassifier - recognizes intent, including Hinglish.
● replyGuard - checks eligibility, blocklists, and whether a reply was already sent.
● instagramClient - calls the approved Meta API endpoints.
● factCard / followUpHandler - answers only from approved product information.
● leadLogger - records enquiries in the Google Sheet.
● tests - checks classification, duplicates, unsupported questions, and failures.
I can begin with hard-coded example comments and mock API responses to understand
the logic, then switch to a permitted live Instagram account for the required proof. A
mock-only demo does not replace the real comment-to-DM demonstration required by the
cohort plan.
Platform check: The PDF describes an intended stack and API flow, not a
guarantee of access. Before live implementation, I must verify the current Meta
permissions, private-reply/messaging endpoints, account eligibility, rate limits,
and approved authentication flow. The PDF uses different speech-model labels
in different places, so I should select an available supported voice model rather
than hard-code a specific version.
8. How I will know the project is successful
The project is complete when I can check every box below:
● I selected one real product and confirmed its actual price, offer, and details.
● I created three accurate ad images and a voiceover.
● I published a 15-second Reel with a comment CTA.
● I captured 48-hour-or-later Insights and wrote three improvement ideas.
● A real eligible comment triggers a private reply, and duplicate/ineligible comments do
not trigger extra replies.
● The comment classifier gets 25 or more out of 30 test comments correct.
● Follow-up replies use only approved shop information, with a human handoff when
uncertain.
● Enquiries reach Google Sheets, with at least 10 lead rows for the final evidence.
● I recorded a 60-90 second demo showing comment -> DM -> follow-up -> lead in
the sheet.
● I prepared a one-page handover and can explain the code, configuration, and
maintenance to another person.
9. Boundaries: what I am not building
To keep this achievable as a learner, I am not trying to build a full e-commerce website,
checkout/payment system, CRM platform, bulk unsolicited DM system, or custom video
editor. The goal is a small, reliable learning project: one product, one Reel, one compliant
comment-to-DM workflow, and one lead sheet.
I will not scrape Instagram, send unsolicited messages, bypass platform permissions or
messaging limits, or make up product facts to sound convincing. I will use test data where
possible and ask permission before collecting or showcasing real customer information.
10. What I want to learn by the end
I want to be able to say:
"I built an AI-assisted Instagram growth workflow for a real product. I used
Cursor or Antigravity to understand and create the backend, connected external
APIs, tested Hindi/Hinglish comment understanding, deployed the bot, captured
leads in a Google Sheet, and handed the working system to a shop owner. I can
show the result and explain how it works."
This is not just an assignment about creating content. My real learning outcome is
knowing how to take a business problem, build it step by step with AI coding
assistance, test it on a real workflow, and ship something useful.
Source: November-cohort-plan.pdf, Masai Live - Insta Growth Kit, November 2026,
pages 1-8. The four milestones, deliverables, and numerical acceptance criteria above come
from the source. The first-person framing, Cursor/Antigravity workflow, suggested code
modules, and explicit development safeguards are added to make the brief practical for
beginner builders.