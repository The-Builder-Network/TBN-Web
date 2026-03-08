import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Terms = () => {
  return (
    <main className="flex-1">
        <div className="container py-16">
          <h1 className="text-4xl font-bold text-foreground mb-8">
            Terms and Conditions
          </h1>

          <Tabs defaultValue="tradesperson" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="tradesperson">For Tradespeople</TabsTrigger>
              <TabsTrigger value="customer">For Customers</TabsTrigger>
            </TabsList>

            <TabsContent
              value="tradesperson"
              className="prose prose-slate space-y-2 max-w-none dark:prose-invert"
            >
              <h1>Tradesperson Terms and Conditions</h1>

              <h3>1. Introduction</h3>
              <p>
                1.1. We are The Builder Network Limited, registered in England
                with registration number 05272398 at 100 St. John Street, London
                EC1M 4EH, trading as “The Builder Network”. You can Contact Us
                if you have any questions or enquiries about these terms and
                conditions or The Builder Network Platform.
              </p>
              <p>
                1.2. These terms and conditions apply to Tradespeople on The
                Builder Network Platform, our online marketplace. For the
                previous version of these terms and conditions as well as the
                dates they applied, see here.
              </p>
              <p>
                1.3. By accessing and then choosing to use The Builder Network
                Platform to offer your services, you are bound by the terms of
                this Agreement. If you do not agree to be bound by this
                Agreement, you must not use or access The Builder Network
                Platform.
              </p>

              <h3>2. Definitions</h3>
              <p>
                2.1. In this Agreement the following words and phrases shall
                have the following meanings:
              </p>
              <p>
                “Account Credit” means a balance of funds granted to your Trade
                Account that you can apply towards the payment of Shortlist
                Fees.
              </p>
              <p>
                “Account Owner” means the individual sole trader or registered
                business entity that has financial responsibility for a Trade
                Account, the ability to nominate the Trade Account Contact and
                the responsibility of the Trade Account's usage.
              </p>
              <p>
                “Agreement” means these Tradesperson terms and conditions as
                well as The Builder Network Policies applicable to Tradespeople.
              </p>
              <p>
                “Contact Us” means contacting us via the form used for
                contacting The Builder Network available here or by emailing us
                at info@thebuildernetwork.com.
              </p>
              <p>
                “Content” means all postings, messages, text, files, images,
                photos, video, sounds, or other materials or communications
                posted on or via The Builder Network Platform by you, including
                without limitation messages sent to The Builder Network
                employees, responses to Feedback and whenever you Contact Us.
              </p>
              <p>
                “Customer” means any person who submits or publishes a Job on
                The Builder Network Platform for Tradespeople to view and
                Express Interest in and/or any person who posts a question on
                “Ask a Tradesperson”.
              </p>
              <p>
                “Data Protection Legislation” means all applicable data
                protection and privacy legislation in force from time to time in
                the UK including the UK GDPR; the Data Protection Act 2018 (and
                regulations made thereunder); the Privacy and Electronic
                Communications Regulations 2003 (SI 2003/2426) as amended and
                all other legislation and regulatory requirements in force from
                time to time which apply to either you or us relating to the use
                of personal data (as defined in the UK GDPR) (including, without
                limitation, the privacy of electronic communications); and the
                guidance and codes of practice issued by the Information
                Commissioner or other relevant regulatory authority and
                applicable to either you or us.
              </p>
              <p>“Derived Materials” has the meaning given in clause 7.4.</p>
              <p>
                “Express Interest” means to contact, quote or message a Customer
                found via The Builder Network Platform or Shortlisting yourself
                for a Job.
              </p>
              <p>
                “Feedback” means reviews and feedback posted by Customers during
                a Job or after a Job has been completed, or reviews from your
                previous customers as permitted by The Builder Network.
              </p>
              <p>
                “Job” means a project/job submitted by a Customer on The Builder
                Network Platform.
              </p>
              <p>
                “Lead” means a Job which we give you the opportunity to Express
                Interest in.
              </p>
              <p>
                “Materials” means content, data or information (including trade
                marks and branding) you provide to us in connection with you and
                your services (but excluding Derived Materials).
              </p>
              <p>
                “The Builder Network” (“us”, “we”, “our” and “ours”) means The
                Builder Network Limited, a company registered in England with
                registration number 05272398 at 100 St. John Street, London EC1M
                4EH.
              </p>
              <p>
                “The Builder Network Platform” means the website
                thebuildernetwork.com (or any other domain owned and controlled
                by The Builder Network from time to time), any web or mobile app
                hosted by The Builder Network from time to time and all the
                pages, Content, sub-domains and tools contained therein.
              </p>
              <p>
                “The Builder Network Policies” means the information on our
                policies and procedures as well as answers to common queries
                available at https://support.thebuildernetwork.com/s (as updated
                from time to time).
              </p>
              <p>
                “Service Agreement” means any agreement reached between you and
                a Customer concerning the services to be performed by you for
                the Customer in any form, including a verbal exchange,
                telephone, SMS, email or in the form of a written
                statement/contract.
              </p>
              <p>
                “Shortlist” and “Shortlisting” and “Shortlisted” means an event
                where a Customer chooses to share their contact details with a
                Tradesperson via The Builder Network Platform or where a
                Tradesperson chooses to shortlist themselves by selecting the
                “shortlist me” option.
              </p>
              <p>
                “Shortlist Fee” means the agreed amount owed by you to The
                Builder Network when contact details are exchanged as a result
                of you being Shortlisted for a Job.
              </p>
              <p>
                “Tax” means all forms of tax and statutory, governmental, state,
                federal, provincial, local, government or municipal charges,
                duties, imposts, contributions, levies, withholdings or
                liabilities wherever chargeable and whether of the UK or any
                other jurisdiction (including, for the avoidance of doubt,
                National Insurance contributions in the UK and corresponding
                obligations elsewhere) and any penalty, fine, surcharge,
                interest, charges or costs relating to it (including interest
                and penalties arising from the failure of The Builder Network to
                make adequate instalment payments under the Corporation Tax
                (Instalments Payments) Regulations 1998 (SI 1998/3175) in any
                period ending on or before Completion).
              </p>
              <p>
                “Tax Authority” means any government, state or municipality or
                any local, state, federal or other fiscal, revenue, customs or
                excise authority, body or official competent to impose,
                administer, levy, assess or collect Tax in the UK or elsewhere.
              </p>
              <p>
                “Trade Account” means your online Tradesperson profile
                registered on The Builder Network Platform.
              </p>
              <p>
                “Trade Account Contact” means the person who is named on the
                Trade Account and has day-to-day control over usage of the Trade
                Account, including activities such as Expressing Interest in
                Leads and communicating with Customers.
              </p>
              <p>
                “Tradespeople” and “Tradesperson” means any business,
                partnership or sole trader who registers on The Builder Network
                Platform in order to connect with Customers.
              </p>
              <p>
                “VAT” means value added tax or equivalent tax in any other
                jurisdiction.
              </p>
              <p>
                “You” means the Tradesperson entering into this Agreement in
                order to make use of The Builder Network Platform.
              </p>

              <h3>3. Becoming a Tradesperson</h3>
              <p>
                3.1. You can apply for a Trade Account on The Builder Network
                Platform by submitting a registration form. When you apply, we
                will ask you to:
              </p>
              <p>
                3.1.1. provide information about you, your services and, to the
                extent applicable, your company;
              </p>
              <p>3.1.2. complete an evaluation for each trade you apply for;</p>
              <p>3.1.3. verify your identity; and</p>
              <p>
                3.1.4. provide such other information or documentation as we may
                reasonably request.
              </p>
              <p>3.2. You guarantee to us that:</p>
              <p>
                3.2.1. you are, and will remain, established in the United
                Kingdom and provide your services in the United Kingdom only;
              </p>
              <p>
                3.2.2. the information you provide to us in connection with your
                application is complete and accurate and you will promptly
                notify us of any changes to such information and keep your Trade
                Account information up to date at all times;
              </p>
              <p>
                3.2.3. you will not in the course of your business hold yourself
                out as having qualifications or expertise that you do not have;
              </p>
              <p>
                3.2.4. any documents you submit to us or to The Builder Network
                Platform are genuine documents or true copies of genuine
                documents.
              </p>
              <p>
                3.3. We may at our option and at any time require you to
                promptly provide us with reasonable evidence that any
                information you have given us is true and up to date and that
                such information and your behaviour is in compliance with this
                Agreement. We can suspend or restrict your Trade Account until
                you have supplied this evidence, and we can end this Agreement
                if you do not comply with our requests.
              </p>
              <p>
                3.4. You permit us to collect information about you and in
                connection with your performance of this Agreement and disclose
                it to tax or other governmental or regulatory authorities if
                asked to so or as required by law or for compliance with our
                legal or regulatory obligations.
              </p>
              <p>3.5. You will ensure that:</p>
              <p>
                3.5.1. all notices, returns (including any land transaction
                returns), reports, accounts, computations, statements,
                assessments, claims, disclaimers, elections and registrations
                and any other necessary information which should be submitted by
                you to any Tax Authority for the purposes of Tax and VAT will be
                made on a proper basis, submitted within applicable time limits
                and will be accurate and complete in all material respects;
              </p>
              <p>
                3.5.2. all Tax and VAT (whether of the UK or elsewhere), which
                you are liable to account for will be duly paid (insofar as such
                Tax ought to have been paid);
              </p>
              <p>
                3.5.3. you will maintain complete and accurate records,
                invoices, elections, statements and other information in
                relation to Tax and VAT that meet all legal requirements and
                enable your Tax (and deferred tax) liabilities to be calculated
                accurately in all material respects; and
              </p>
              <p>
                3.5.4. all Tax deductible under the PAYE system, the
                Construction Industry Scheme and/or any other Tax statute have
                been and will be deducted from all payments made (or treated as
                made) by you.
              </p>
              <p>
                3.6. You represent and warrant that you will include in your
                Trade Account all the information about you and your services
                that is needed to comply with consumer protection law, as well
                as any relevant safety information about your services. You are
                responsible for making sure you comply with the law.
              </p>

              <h3>4. Use of The Builder Network Platform</h3>
              <p>
                4.1. You agree to use The Builder Network Platform for
                advertising and selling your services, communicating with us and
                your Customers and in a way that does not infringe the rights
                of, restrict, or inhibit any other user's use and enjoyment of
                The Builder Network Platform.
              </p>
              <p>4.2. You guarantee to us that:</p>
              <p>
                4.2.1. when using The Builder Network Platform, you are
                operating in your business capacity as a sole trader,
                partnership, limited liability company, limited liability
                partnership, corporation or other business entity;
              </p>
              <p>
                4.2.2. you (and anyone who works for you or who you work with)
                have the unrestricted right to work in the United Kingdom;
              </p>
              <p>
                4.2.3. you have any and all insurance required to operate your
                business and provide your services, including having others
                working with or for you;
              </p>
              <p>
                4.2.4. you will honour your commitments to Customers, including
                by responding to Shortlisting promptly, performing the Job as
                agreed with the Customer and providing timely, high-quality
                services to your Customers;
              </p>
              <p>
                4.2.5. you will at all times meet the quality criteria set out
                in the Quality Standard as may be amended from time to time; and
              </p>
              <p>
                4.2.6. you will only offer and provide services for which you
                have the necessary skills and expertise, and provide these
                services safely and in accordance with all applicable law.
              </p>
              <p>
                4.3. You agree to use all reasonable security practices to
                prevent unauthorised access or damage to The Builder Network
                Platform. These practices include but are not limited to:
              </p>
              <p>
                4.3.1. making sure any devices you use to access The Builder
                Network Platform have up to date anti-virus protection and not
                introducing any viruses into The Builder Network Platform;
              </p>
              <p>
                4.3.2. ensuring that your log-in details and passwords for your
                Trade Account are only used by you or your authorised employees
                and subcontractors; and
              </p>
              <p>
                4.3.3. telling us immediately if you think that your log-in
                details, passwords or other Trade Account information is being
                or may be used in an unauthorised way or that the security of
                The Builder Network Platform has been compromised in any way.
              </p>
              <p>
                4.4. Except as permitted by applicable law which you and we
                cannot agree to exclude, you shall not:
              </p>
              <p>
                4.4.1. attempt to copy, modify, duplicate, create derivative
                works from, frame, mirror, republish, download, display,
                transmit, or distribute all or any portion of The Builder
                Network Platform in any form or media or by any means;
              </p>
              <p>
                4.4.2. attempt to de-compile, reverse compile, disassemble,
                reverse engineer or otherwise reduce to human-perceivable form
                all or any part of The Builder Network Platform;
              </p>
              <p>
                4.4.3. access all or any part of The Builder Network Platform to
                build a competing product or service;
              </p>
              <p>
                4.4.4. create multiple accounts as a Tradesperson without our
                written consent;
              </p>
              <p>
                4.4.5. in any way attempt to use systems or methods suitable for
                circumventing or avoiding the payment of the Shortlist Fee, for
                example by sharing your contact details before being
                Shortlisted;
              </p>
              <p>
                4.4.6. use any data from The Builder Network Platform for the
                development of any software programme (including but not limited
                to training a machine learning or artificial intelligence
                system); or
              </p>
              <p>
                4.4.7. use any manual or automated software, devices, or other
                processes (including but not limited to spiders, robots,
                scrapers, crawlers, avatars, data mining tools or the like) (“AI
                Tools”) to scrape, harvest, or download data from The Builder
                Network Platform.
              </p>
              <p>
                4.5. We aim to make The Builder Network Platform available to
                you and to Customers on a 24/7 basis. We reserve the right to
                take The Builder Network Platform or any part of it offline as
                reasonably required for routine and emergency maintenance and
                repairs. We will aim to give you as much notice of such downtime
                as may be reasonable. All communications using the internet may
                be affected by events outside our reasonable control.
              </p>
              <p>
                4.6. You understand that in providing The Builder Network
                Platform we are reliant on services supplied by third party
                providers. To the extent permitted by law, we will be excused
                for default or delay of performance and will have no liability
                to the extent that such default or delay is caused by any defect
                or deficiency in any products or services provided by any third
                party provider.
              </p>

              <h3>5. Content</h3>
              <p>
                5.1. You are responsible for all Content that you upload to,
                communicate or make available via The Builder Network Platform.
                Such Content:
              </p>
              <p>
                5.1.1. must not be contrary to applicable law and regulations or
                be unlawful;
              </p>
              <p>
                5.1.2. must not include any profanities, any racial slurs,
                sexist remarks or any other rude, abusive or offensive language;
              </p>
              <p>
                5.1.3. must not include your contact details or links to any
                other websites until you have been Shortlisted.
              </p>
              <p>
                If you post any Content which we consider is in violation of
                this clause 5.1 we have the right to suspend or terminate your
                access to The Builder Network Platform in accordance with clause
                17.1.
              </p>
              <p>
                5.2. You understand that The Builder Network does not pre-screen
                or approve Content. However, The Builder Network shall have the
                right but not the obligation and at its sole discretion to
                monitor, remove or alter any Content that is available on The
                Builder Network Platform for any reason whatsoever.
              </p>

              <h3>6. Ranking</h3>
              <p>
                6.1. The display of your Trade Account in the profile search is
                ranked by us using an algorithm based on various parameters. We
                have set out below the main parameters taken into account in
                order to improve the predictability of the ranking and help you
                optimise the presentation of your Trade Account and services.
                The following parameters determine your ranking and are set out
                below in order of importance and weighting applied:
              </p>
              <p>
                6.1.1. Relevance: only those Tradespeople who offer the specific
                trades and/or services requested in a particular Job are
                displayed in the ranking list.
              </p>
              <p>
                6.1.2. Geographical proximity: it is generally important for the
                Customer to find a Tradesperson who is not too far away from the
                location of the Job, because a short distance usually leads to
                faster availability of the Tradesperson and lower costs for the
                Customer.
              </p>
              <p>
                6.1.3. Customer Feedback: Feedback from Customers can be a
                valuable indication for the Customer as to whether these
                Customers have been satisfied with your services and behaviour
                in the past. The better your rating, the higher up you will
                appear in the ranking for the Customer.
              </p>
              <p>
                6.1.4. Interactions with Customers: your activity on The Builder
                Network Platform can indicate how quickly you Express Interest
                in Leads, Shortlisting and other communications. We therefore
                evaluate how many replies you sent in the week before the Job
                was created by the Customer and whether these replies related to
                comparable Jobs. The higher the number of answers, the higher up
                you will appear in the ranking for the Customer.
              </p>
              <p>
                6.1.5. Randomisation: we want to ensure that even Tradespeople
                who have only been active on The Builder Network Platform for a
                short time and therefore have a lower chance of scoring on the
                other ranking parameters have a chance of getting the Job. We
                therefore allow a Tradesperson who has been active on The
                Builder Network Platform for 2 months or less to be ranked
                higher than they otherwise would be based on our ranking
                parameters. This is a purely random selection of the
                Tradesperson and the place that they appear except for them
                appearing higher than they otherwise might be. These new
                Tradespeople will also be ranked according to the main
                parameters mentioned above.
              </p>
              <p>
                6.2. Neither the ranking we carry out nor your position in any
                ranking can be influenced directly or indirectly by the payment
                of any fees.
              </p>

              <h3>7. Intellectual Property</h3>
              <p>
                7.1. The Builder Network is the owner or licensor of all the
                intellectual property rights in and relating to The Builder
                Network Platform, including the designs, text, database,
                graphics and layouts as well as the Derived Materials. We grant
                you a limited, non-exclusive, non-transferable licence to access
                and use The Builder Network Platform for the purposes set out in
                this Agreement.
              </p>
              <p>
                7.2. You may use The Builder Network logo whilst you have an
                active Trade Account. In the event that your Trade Account is
                terminated for any reason, you must remove The Builder Network
                logo and any reference to your previous affiliation with The
                Builder Network from all marketing/information material as soon
                as possible and in any event within 28 days of such termination.
              </p>
              <p>
                7.3. In the event that you use any of the intellectual property
                owned by The Builder Network other than as expressly set out in
                this Agreement, we may suspend or terminate your Trade Account
                and we reserve all rights to take the appropriate legal action
                against you.
              </p>
              <p>
                7.4. You grant us a non-exclusive, worldwide, royalty-free,
                perpetual licence to use, host, reproduce, display and publish
                your Materials for the purposes of (a) the provision of The
                Builder Network Platform (including improvements and
                enhancements thereto); (b) advertising your services on The
                Builder Network Platform, and (c) the creation, development or
                production of analysis, data, improvements, enhancements and new
                or improved features and functionalities (“Derived Materials”).
                You agree that we may use AI Tools to create Derived Materials.
                Except as stated in this Agreement, we won't acquire any rights
                to your Materials and any goodwill generated by our use of your
                Materials on The Builder Network Platform or through our
                marketing activities will accrue to you.
              </p>
              <p>
                7.5. As soon as reasonably possible after this Agreement ends we
                will stop all use of your Materials on The Builder Network
                Platform. Notwithstanding this, we reserve the right to continue
                using your Materials in order to comply with our own regulatory,
                legal and internal compliance purposes.
              </p>

              <h3>8. Confidentiality</h3>
              <p>
                8.1. Neither you nor we (the “Recipient”) shall at any time
                disclose to any person any confidential information concerning
                the business, assets, affairs, customers, clients or suppliers
                of the other (the “Discloser”) or of any member of the group of
                companies to which the Discloser belongs, except:
              </p>
              <p>
                8.1.1. to the Recipient's employees, officers, representatives,
                contractors, subcontractors or advisers who need to know such
                information for the purposes of exercising the Recipient's
                rights or carrying out its obligations under or in connection
                with this Agreement. The Recipient shall ensure that its
                employees, officers, representatives, contractors,
                subcontractors or advisers to whom it discloses the Discloser's
                confidential information comply with this clause 8;
              </p>
              <p>
                8.1.2. as may be required by law, a court of competent
                jurisdiction or any governmental or regulatory authority.
              </p>
              <p>
                8.2. The Recipient shall not use the Discloser's confidential
                information for any purpose other than to exercise its rights
                and perform its obligations under or in connection with this
                Agreement (including complying with its legal and regulatory
                obligations).
              </p>

              <h3>9. Data Protection</h3>
              <p>
                9.1. We and you are both a data controller as defined under the
                Data Protection Legislation.
              </p>
              <p>
                9.2. We each agree to comply with all Data Protection
                Legislation relevant to each of us as a data controller.
              </p>
              <p>
                9.3. We will only use your personal data as set out in our
                Privacy Policy for Tradespeople, available at Privacy Policy |
                The Builder Network, as updated from time to time.
              </p>
              <p>9.4. You agree that you shall:</p>
              <p>
                9.4.1. only use any personal data shared with you by us directly
                or via The Builder Network Platform, including Customer personal
                data (“Personal Data”) for the purposes of carrying out the
                agreed services for that Customer and complying with your
                contractual, legal and regulatory obligations (the “Agreed
                Purposes”);
              </p>
              <p>
                9.4.2. use appropriate measures to keep all Personal Data safe
                and secure;
              </p>
              <p>
                9.4.3. not disclose the Personal Data to any third party other
                than as strictly necessary for the Agreed Purposes;
              </p>
              <p>
                9.4.4. promptly inform us if you receive any data subject rights
                request;
              </p>
              <p>
                9.4.5. provide us with reasonable assistance in complying with
                any data subject rights request;
              </p>
              <p>
                9.4.6. not disclose, release, amend, delete or block any
                Personal Data in response to a data subject rights request
                without first consulting us wherever possible;
              </p>
              <p>
                9.4.7. assist us in responding to any request from a data
                subject and in ensuring compliance with our obligations under
                the Data Protection Legislation with respect to security,
                personal data breach notifications, data protection impact
                assessments and consultations with the Information Commissioner
                or other regulators;
              </p>
              <p>
                9.4.8. notify us without undue delay on becoming aware of any
                breach of the Data Protection Legislation;
              </p>
              <p>
                9.4.9. maintain complete and accurate records and information to
                demonstrate you compliance with this clause 9; and
              </p>
              <p>
                9.4.10. notify us without undue delay on becoming aware of any
                loss of, unauthorised use of or unauthorised access to any
                Personal Data.
              </p>

              <h3>10. Leads, Jobs and Customer communications</h3>
              <p>
                10.1. You can Express Interest in a Lead by sending the relevant
                Customer an introduction message. The Customer can either
                decline or add you to their Shortlist, or you can choose to
                select, if available, the “shortlist me” button. If you are
                added to the Customer's Shortlist, you will automatically
                receive their contact details to get in touch directly.
              </p>
              <p>
                10.2. You agree to pay The Builder Network a non-refundable
                (subject to clause 12.8) Shortlist Fee every time you are
                Shortlisted for a job through The Builder Network Platform. The
                Shortlist Fee (excluding VAT) is clearly displayed in relation
                to each Lead, and will also be clearly displayed as you Express
                Interest in a Lead or a Job. Each Shortlist Fee is calculated
                based on the likely size, value and location of the Job.
              </p>
              <p>
                10.3. You understand that The Builder Network cannot influence
                the outcome of any particular Shortlisting and does not
                guarantee that you will be able to quote or secure work for Jobs
                you are Shortlisted for.
              </p>
              <p>
                10.4. You agree that you shall not attempt to obtain a
                Customer's contact details or otherwise exchange contact details
                with the Customer outside of The Builder Network Platform
                (including directing a Customer to your own website for such
                purpose) in order to avoid paying the Shortlist Fee. Any breach
                of this clause 10.4 shall give rise to our right to terminate
                this Agreement in accordance with clause 17.1.1.
              </p>
              <p>
                10.5. Your interactions (including quotes, payment and delivery
                of goods or services and/or any other terms of your Service
                Agreements) with Customers found through The Builder Network
                Platform are solely between you and such Customers.
              </p>
              <p>
                10.6. You agree that The Builder Network shall not be
                responsible or liable for any loss or damage of any sort
                incurred as the result of any such interactions. If there is a
                dispute between you and a Customer, between you and another
                Tradesperson or between you and any third party, you understand
                and agree that The Builder Network is under no obligation to
                become involved.
              </p>
              <p>
                10.7. In the event that you do have a dispute with a Customer or
                with another Tradesperson, you hereby release The Builder
                Network, its officers, employees, agents and successors in
                rights from any and all losses, claims, demands and damages
                (actual and consequential) of every kind or nature, known or
                unknown, suspected and unsuspected, disclosed and undisclosed,
                arising out of or in any way related to such disputes other than
                to the extent arising from our breach of this Agreement. Nothing
                in this clause 10.7 limits or excludes either party's liability
                for anything which cannot be limited or excluded.
              </p>
              <p>
                10.8. The Builder Network will not be involved or held liable
                for any Service Agreement between you and the Customer and The
                Builder Network is not a party to any Service Agreement,
                contract or other agreement that may arise between you and the
                Customer as a result of your use of The Builder Network
                Platform. Accordingly, we are not liable for any loss or damage
                that you incur resulting from any such agreement. This clause
                shall survive the termination of this Agreement.
              </p>

              <h3>11. Customer Feedback</h3>
              <p>
                11.1. You acknowledge that you will be subject to Feedback from
                Customers if, after Expressing Interest, a Service Agreement has
                been agreed to carry out some or all of the Job advertised and
                that Job has started and/or any money has been paid to you. You
                will be offered an opportunity to respond to any Feedback.
              </p>
              <p>11.2. You shall not:</p>
              <p>
                11.2.1. submit or procure any Feedback falsely posing as a
                genuine Customer;
              </p>
              <p>
                11.2.2. allow or encourage Feedback for which you have paid or
                otherwise incentivised the originator of such Feedback; or
              </p>
              <p>
                11.2.3. commission or procure any false or misleading Feedback.
              </p>
              <p>
                11.3. You acknowledge and agree that The Builder Network is not
                responsible for any Feedback that your Customers post, nor for
                any harm done by such Feedback or the legality or accuracy of
                such Feedback. Notwithstanding this, we perform a number of
                checks on Feedback with the aim of ensuring that Feedback is
                authentic and posted by a genuine Customer and we may remove
                Feedback that appears to be fake or fraudulent, or at the
                request of the author of such Feedback, at our sole discretion.
              </p>

              <h3>12. Payment Terms</h3>
              <p>
                12.1. We will send you an invoice to your Trade Account and an
                invoice payment notification to your designated email address on
                a (subject to clause 12.2) not less than weekly basis for all
                Shortlist Fees incurred since the previous invoice. Each invoice
                shall be due and payable on the date of that invoice or
                otherwise in accordance with the terms of that invoice. Payment
                reminders may be issued by email, SMS and/or by push
                notification.
              </p>
              <p>
                12.2. We reserve the right to issue invoices earlier or more
                frequently in the event that you breach our payment terms or
                reach a certain limit. We will inform you of such breach or
                limit when we issue you with an invoice.
              </p>
              <p>
                12.3. You understand that we only accept payment for invoices
                online by credit or debit card. When you apply for your Trade
                Account you will be required to provide card details and you
                authorise, and confirm to us that you have the rights to
                authorise The Builder Network to automatically collect payment
                from that card on the due date of each invoice. We may introduce
                additional payment methods from time to time and we will inform
                you when we do so along with any additional terms and conditions
                applicable to that payment method.
              </p>
              <p>
                12.4. If your Trade Account pre-dates 26 February 2024, you may
                have a legacy manual payment mechanism, and if you do, we will
                not automatically collect payment in accordance with clause
                12.3. However, you must still make payment of each invoice on
                the due date of that invoice as set out in clause 12.1. Once
                your designated payment card expires, or if you want to update
                your payment card or payment method, you will be required to
                move to the automated payment method.
              </p>
              <p>
                12.5. We reserve the right to charge interest on any overdue
                amounts at a rate of 4% above the Bank of England's base rate
                from time to time, but at 4% a year for any period when that
                base rate is below 0%, from when the overdue sum became due
                until it is paid. If your account has an invoice which is still
                overdue fifteen days after the date of such invoice, we will be
                entitled to suspend your Trade Account and your access to The
                Builder Network Platform on notice to you in accordance with
                clause 17.3 until the outstanding amounts have been paid in
                full.
              </p>
              <p>
                12.6. The Builder Network may designate or change any
                third-party provider to accept payment of your invoice at any
                time.
              </p>
              <p>
                12.7. It is your responsibility to keep a copy of all your
                invoices securely. The Builder Network does not accept any
                responsibility for your record-keeping duties owed to any third
                party including, but not limited, to HM Revenue and Customs.
              </p>
              <p>
                12.8. Any decision to issue a refund is made in line with The
                Builder Network Policies (that may be changed from time to time)
                and made at our sole discretion. Any refund that is offered to
                you will only be provided by way of Account Credit.
              </p>

              <h3>13. Account Credit</h3>
              <p>
                13.1. From time to time, The Builder Network may offer you
                Account Credit. Account Credit cannot be exchanged or returned
                for cash and cannot be transferred to any other Trade Account.
              </p>
              <p>
                13.2. If your Trade Account has Account Credit, each time you
                incur a Shortlist Fee the balance of such Account Credit will be
                reduced by the value of the Shortlist Fee for the relevant Lead.
                If the Shortlist Fee is not fully paid by your Account Credit,
                an invoice will be issued for the remaining amount.
              </p>
              <p>
                13.3. The Account Credit will be provided to you with an expiry
                date or if not provided, the expiry date shall be 12 months from
                issue. When an expiry date is reached, any Account Credit
                remaining will expire and will be removed from your account
                balance.
              </p>

              <h3>14. Failed & Disputed Payments</h3>
              <p>
                14.1. If you have a question about a charge on your credit or
                debit card, you can Contact Us.
              </p>
              <p>
                14.2. Should any payment method you use fail or is later
                reclaimed by the bank or card issuer you shall repay the fee
                using an alternative method as well as pay any costs incurred by
                us and we reserve the right to charge a £20 + VAT administration
                fee.
              </p>

              <h3>15. Liability and claims</h3>
              <p>15.1. Liability shall not be limited:</p>
              <p>15.1.1. by either party in respect of:</p>
              <p>
                (a) death or personal injury caused by its negligence;
                <br />
                (b) fraud or fraudulent misrepresentation; or
                <br />
                (c) any other liability which cannot be limited or excluded by
                law, and
              </p>
              <p>
                15.1.2. by you in respect of your liability to us under clauses
                15.3 and 15.4.
              </p>
              <p>
                15.2. Subject to clause 15.1, The Builder Network is responsible
                for losses you suffer caused by us breaching this Agreement
                unless the loss is:
              </p>
              <p>
                15.2.1. unexpected or unforeseeable. It was not obvious that it
                would happen and nothing you said to us before entering into
                this Agreement meant we should have expected it;
              </p>
              <p>
                15.2.2. caused by a delaying event outside our control. As long
                as we have taken the steps set out in clause 20.1, we're not
                responsible for delays outside our control;
              </p>
              <p>
                15.2.3. avoidable. Something you could have avoided by taking
                reasonable action. For example, damage to your own digital
                content, which was caused by digital content we supplied and
                which you could have avoided by following our advice to apply a
                free update or by correctly following the installation
                instructions or having the minimum system requirements advised
                by us;
              </p>
              <p>
                15.2.4. a loss of business, profit, goodwill or opportunity.
              </p>
              <p>
                15.3. If any third party, including without limitation a
                Customer, any regulator, any Tax Authority or any other third
                party rights holder, makes a claim or takes any kind of action
                against us in connection with:
              </p>
              <p>
                15.3.1. your services and their supply through The Builder
                Network Platform;
              </p>
              <p>
                15.3.2. Content you've uploaded to or otherwise distributed
                through The Builder Network Platform, including without
                limitation your Trade Account, responses to Feedback, your
                communications with Customers, advertising, and any omissions or
                inaccuracies in such Content;
              </p>
              <p>
                15.3.4. things you have or haven't done including but not
                limited to any breach of this Agreement,
              </p>
              <p>(each a “Third Party Claim”),</p>
              <p>
                then you must, at our option and as we request, either help us
                defend or deal with the Third Party Claim or defend or deal with
                it on our behalf, in each case at your own expense. If we ask
                you to defend or deal with a claim on our behalf, you must get
                our prior written agreement before settling or compromising it
                or attempting to do so.
              </p>
              <p>
                15.4. You must pay us an amount (calculated on a full indemnity
                after-tax basis) equivalent to any liabilities, fines, costs,
                expenses, damages and losses (including but not limited to any
                direct, indirect or consequential losses, loss of profit, loss
                of reputation and any tax liabilities or third party charges)
                and all interest, penalties and legal costs and all other
                reasonable professional costs and expenses we incur out of or in
                connection with any Third Party Claim.
              </p>
              <p>
                15.5. If our provision of The Builder Network Platform directly
                and on its own causes damage to a device or digital content
                belonging to you, we will either repair the damage or pay you
                compensation. However, we will not be liable for damage that you
                could have avoided by following our advice to apply an update
                offered to you free of charge or for damage that was caused by
                you failing to correctly follow installation instructions or to
                have in place the minimum system requirements advised by us.
              </p>

              <h3>16. Change of Account Ownership and Trade Account Contact</h3>
              <p>
                16.1. There are only limited circumstances in which an Account
                Owner or a Trade Account Contact can be changed to a different
                person or legal entity. At no time may an Account Owner or Trade
                Account Contact be changed to an individual or organisation not
                associated with the Account Owner.
              </p>
              <p>
                16.2. In the event that an Account Owner is a limited
                company/partnership and that limited company is dissolved or
                partnership is terminated, you agree to Contact Us to let us
                know immediately.
              </p>
              <p>
                16.3. All Account Owner and Trade Account Contact changes are
                made at our sole discretion, in line with our internal policy
                that may be changed from time to time.
              </p>

              <h3>17. Termination and Suspension</h3>
              <p>
                17.1. We can end this Agreement and your right to use The
                Builder Network Platform for any of the following reasons:
              </p>
              <p>
                17.1.1. you have breached this Agreement or any part of this
                Agreement, including The Builder Network Policies;
              </p>
              <p>
                17.1.2. you have not paid one of our invoices by the due date;
              </p>
              <p>
                17.1.3. you've become insolvent or you suspend, threaten to
                suspend, cease or threaten to cease to carry on all or a
                substantial part of your business or your financial position
                deteriorates to such an extent that we think your ability to
                fulfil your obligations under this Agreement is at risk;
              </p>
              <p>
                17.1.4. you receive legitimate negative Feedback from Customers;
              </p>
              <p>
                17.1.5. you do not meet the quality criteria contained in the
                Quality Standard;
              </p>
              <p>
                17.1.6. we reasonably consider that you continuing to offer your
                services via The Builder Network Platform could expose The
                Builder Network Platform to disrepute, contempt, scandal or
                ridicule, or would reflect unfavourably on The Builder Network's
                reputation or the other Tradespeople;
              </p>
              <p>
                17.1.7. we decide to stop providing The Builder Network Platform
                or to stop selling your type of products on The Builder Network
                Platform;
              </p>
              <p>
                17.1.8. we reasonably determine, or receive information or
                notice from a Tax Authority, that you are not meeting your tax
                obligations.
              </p>
              <p>
                17.2. We will give you at least thirty (30) days' notice that we
                are ending this Agreement as set out above, unless:
              </p>
              <p>
                17.2.1. our legal, regulatory or tax obligations require us to
                end this Agreement sooner;
              </p>
              <p>
                17.2.2. it is necessary for us to end this Agreement sooner or
                immediately, including (without limitation) if we reasonably
                believe that you present a danger to Customers or are acting
                fraudulently; or
              </p>
              <p>17.2.3. you have repeatedly breached this Agreement.</p>
              <p>
                17.3. Without prejudice to clause 17.1, we may suspend your
                access to The Builder Network Platform at any time if any fees
                are overdue or if we believe there is a legal, regulatory,
                security or reputational risk to The Builder Network, The
                Builder Network Platform, the Customers or other Tradespeople.
              </p>
              <p>
                17.4. If we suspend or terminate your Trade Account and/or
                access to The Builder Network Platform, we will in most cases
                provide you with a statement of reasons on a durable medium for
                such suspension or termination at the time of such suspension or
                termination setting out the specific facts or circumstances
                which led to our decision and the grounds on which we are
                suspending or terminating your Trade Account or access. However,
                we won't give you such a statement if:
              </p>
              <p>
                17.4.1. we're subject to a legal, tax or regulatory obligation
                not to provide the specific facts or circumstances or to set out
                our reasons; or
              </p>
              <p>17.4.2. you have repeatedly breached this Agreement.</p>
              <p>
                17.5. You agree that The Builder Network shall have no liability
                to you or any third party for any termination or suspension of
                your access to The Builder Network Platform.
              </p>
              <p>
                17.6. You agree not to attempt to use The Builder Network
                Platform after this Agreement has been terminated or if your
                access to The Builder Network Platform has been suspended.
              </p>
              <p>
                17.7. In the event of termination or withdrawal of this
                Agreement, for any reason, the Tradesperson's obligation to pay
                amounts already accrued and due to The Builder Network do not
                cease.
              </p>
              <p>
                17.8. You may stop using The Builder Network Platform at any
                time. This Agreement will end when you have paid all outstanding
                invoices and then Contact Us to inform us that you no longer
                wish to use The Builder Network Platform.
              </p>

              <h3>18. Changes</h3>
              <p>
                18.1. We will let you know via email, message on The Builder
                Network Platform or another durable medium about any changes we
                are making to this Agreement, unless they are minor amendments
                which do not alter the content or meaning of this Agreement. We
                will normally give you fifteen (15) days' notice before such
                changes take effect.
              </p>
              <p>
                18.2. We will give you more notice if a change we are making
                impacts on the way you carry out your business or services.
              </p>
              <p>
                18.3. We won't give you advance notice in limited circumstances
                if we have to make a change with immediate effect, such as for
                legal or regulatory reasons or to protect The Builder Network
                Platform, Tradespeople or Customers from fraud, malware, data
                breaches or other security risks.
              </p>
              <p>
                18.4. If you do not want to accept the changes we are making,
                you may end this Agreement in accordance with clause 17.8.
              </p>

              <h3>19. Complaints and disputes</h3>
              <p>
                19.1. If you have a complaint about The Builder Network Platform
                or the way we have treated you (including if you disagree with
                our suspension or termination of your Trade Account or access to
                The Builder Network Platform), please Contact Us.
              </p>
              <p>
                19.2. We will deal with your complaint within a reasonable time
                frame depending on the complexity and scope of the complaint. If
                we have any questions about your complaint, we will ask you
                questions as part of the process. Both you and we agree to try
                to resolve all complaints by amicable and reasonable discussion.
                If the complaint cannot be resolved in this way, either of us
                can request mediation in accordance with clause 19.3, and in
                addition either party may bring legal action at any time in
                accordance with clause 20.8.1.
              </p>
              <p>
                19.3. Either party can request that any dispute between us be
                referred to the Centre for Effective Dispute Resolution (“CEDR”)
                through their website at www.cedr.com/submit-a-complaint/. CEDR
                does not charge you for making a complaint. Each party agrees to
                act in good faith when considering any requests for mediation
                and when engaging in mediation.
              </p>
              <p>
                19.4. We may refuse mediation of a dispute which has previously
                been mediated if the mediator determined you were not acting in
                good faith in that dispute. We may also refuse mediation of any
                dispute connected to other disputes in which a mediator has
                repeatedly found in our favour.
              </p>
              <p>
                19.5. We will bear a reasonable and proportionate amount of the
                total costs of any mediation, taking into account all relevant
                elements of the dispute, as determined by the mediator.
              </p>
              <p>
                19.6. Information on the number of complaints submitted, the
                main types of complaints, the average time taken to process
                complaints and aggregated information on the outcome of
                complaints can be found here.
              </p>

              <h3>20. Other important terms</h3>
              <p>20.1. Force majeure</p>
              <p>
                20.1.1. Neither you nor we shall be in breach of this Agreement
                or otherwise liable for any failure or delay in performing their
                obligations if such delay or failure results from events,
                circumstances or causes beyond the affected party's reasonable
                control. The time for performance of such obligations shall be
                extended accordingly. If the period of delay or non-performance
                continues for thirty (30) days, the party not affected may end
                this agreement by giving ten (10) days' prior written notice.
                The party affected shall take reasonable steps to prevent or
                minimise any delay or non-performance.
              </p>
              <p>20.2. Assignment</p>
              <p>
                20.2.1. We can transfer this Agreement with you, so that a
                different organisation is responsible for supplying The Builder
                Network Platform. We'll tell you in writing if this happens and
                we'll ensure that the transfer won't affect your rights under
                this Agreement.
              </p>
              <p>20.3. Entire agreement</p>
              <p>
                20.3.1. This Agreement constitutes the entire agreement between
                you and us in relation to the provision of The Builder Network
                Platform. Both you and we acknowledge that in entering into this
                Agreement neither of us relies on any statement, representation,
                assurance or warranty (whether made innocently or negligently)
                that is not set out in this Agreement.
              </p>
              <p>20.4. Third party rights</p>
              <p>
                20.4.1. Nobody else has any rights under this Agreement. This
                Agreement is between you and us. Nobody else can enforce it and
                neither of us will need to ask anybody else to sign-off on
                ending or changing it.
              </p>
              <p>20.5. Invalidity</p>
              <p>
                20.5.1. If a court invalidates some of this Agreement, the rest
                of it will still apply. If a court or other authority decides
                that some of these terms are unlawful, the rest will continue to
                apply.
              </p>
              <p>20.6. Waiver M</p>
              <p>
                20.6.1. Even if we delay in enforcing this Agreement, we can
                still enforce it later. We might not immediately chase you for
                not doing something or for doing something you're not allowed
                to, but that doesn't mean we can't do it later.
              </p>
              <p>20.7. Severance</p>
              <p>
                20.7.1. If any provisions hereof are held to be illegal or
                unenforceable, such provisions shall be severed and the
                remainder of this Agreement shall remain in full force and
                effect unless the business purpose of this Agreement is
                substantially frustrated.
              </p>
              <p>20.8. Governing Law & Jurisdiction</p>
              <p>
                20.8.1. This Agreement shall be governed by and construed in
                accordance with English law. Disputes arising in connection with
                this Agreement shall be subject to the jurisdiction of the
                English courts. If you live in Wales, Scotland or Northern
                Ireland, you can also bring claims against us in the courts of
                the country you live in. We can also claim against you in the
                courts of the country you live in.
              </p>
              <p className="text-sm text-muted-foreground mt-8">
                Updated: 26 February 2024
              </p>
            </TabsContent>

            <TabsContent
              value="customer"
              className="prose prose-slate max-w-none dark:prose-invert"
            >
              <h2>Customer Terms and Conditions</h2>

              <h3>1. Introduction</h3>
              <p>
                1.1. We are The Builder Network Limited, registered in England
                with registration number 05272398 at 100 St. John Street, London
                EC1M 4EH, trading as “The Builder Network”. You can Contact Us
                if you have any questions or enquiries about these terms and
                conditions or The Builder Network Platform.
              </p>
              <p>
                1.2. These terms and conditions apply to Customers using The
                Builder Network Platform, our online marketplace. For the
                previous version of these terms and conditions as well as the
                dates they applied, see here.
              </p>
              <p>
                1.3. By accessing and then choosing to use The Builder Network
                Platform to search for services, you agree to comply with and be
                bound by the terms of this Agreement as set out below. If you do
                not agree to be bound by this Agreement, you must not use or
                access The Builder Network Platform.
              </p>

              <h3>2. Definitions</h3>
              <p>
                2.1. In this Agreement the following words and phrases shall
                have the following meanings:
              </p>
              <p>“Agreement” means these Customer terms and conditions.</p>
              <p>
                “Contact Us” means contacting us via the form used for
                contacting The Builder Network available here or by emailing us
                at info@thebuildernetwork.com.
              </p>
              <p>
                “Content” means all postings, messages, text, files, images,
                photos, video, sounds, or other materials posted on The Builder
                Network Platform by you including without limitation messages
                sent to The Builder Network employees, responses to Feedback and
                whenever you Contact Us.
              </p>
              <p>
                “Customer” means any person who submits or publishes a Job on
                The Builder Network Platform for Tradespeople to view and
                Express Interest in and/or any person who posts a question on
                “Ask a Tradesperson”.
              </p>
              <p>
                “Customer Account” means your online account on The Builder
                Network Platform.
              </p>
              <p>
                “Customer Privacy Policy” means the privacy policy available at
                https://www.thebuildernetwork.com/privacy-policy#customer, as
                updated or amended from time to time.
              </p>
              <p>
                “Express Interest” means when a Tradesperson contacts or
                messages you or provides you with a quote via The Builder
                Network Platform or Shortlists themselves for your Job.
              </p>
              <p>
                “Feedback” means reviews and feedback posted by Customers during
                a Job or after a Job has been completed, or reviews from a
                Tradesperson's previous customers as permitted by The Builder
                Network.
              </p>
              <p>
                “Job” means a project / job submitted by you to The Builder
                Network Platform.
              </p>
              <p>
                “The Builder Network” (“us”, “we”, “our” and “ours”) means The
                Builder Network Limited, a company registered in England with
                registration number 05272398 at 100 St. John Street, London EC1M
                4EH.
              </p>
              <p>
                “The Builder Network Platform” means the website
                thebuildernetwork.com (or any other domain owned and controlled
                by The Builder Network from time to time), any web or mobile app
                hosted by The Builder Network from time to time and all the
                pages, Content, sub-domains and tools contained therein.
              </p>
              <p>
                “Service Agreement” means any agreement reached between a
                Tradesperson and a Customer concerning the services to be
                performed. A Service Agreement can be reached by; a verbal
                exchange, telephone, SMS, email or in the form of a written
                statement/contract.
              </p>
              <p>
                “Shortlist” means your choice to add a Tradesperson to your
                shortlist for a particular Job via The Builder Network Platform
                or a Tradesperson choosing to shortlist themselves for a
                particular Job.
              </p>
              <p>
                “Tradespeople” and “Tradesperson” means any business,
                partnership or sole trader who registers on The Builder Network
                Platform in order to connect with Customers.
              </p>
              <p>
                “You” means the Customer signing up to use The Builder Network
                Platform in accordance with this Agreement.
              </p>

              <h3>3. Use of The Builder Network Platform</h3>
              <p>
                3.1. You agree to use The Builder Network Platform for posting
                Jobs, searching for and connecting with Tradespeople,
                communicating with us and Tradespeople and in a way that does
                not infringe the rights of, restrict, or inhibit any other
                user's use and enjoyment of The Builder Network Platform.
              </p>
              <p>
                3.2. You agree to use all reasonable security practices to
                prevent unauthorised access or damage to The Builder Network
                Platform. These practices include but are not limited to:
              </p>
              <p>
                3.2.1. making sure any devices you use to access The Builder
                Network Platform have up to date anti-virus protection and not
                introducing any viruses into The Builder Network Platform;
              </p>
              <p>
                3.2.2. ensuring that your log-in details and passwords for your
                Customer Account:
              </p>
              <p>
                (a) are only used by you; and
                <br />
                (b) are not shared between users; and
              </p>
              <p>
                3.2.3. telling us immediately if you think that your log-in
                details, passwords or other Customer Account information is
                being or may be used in an unauthorised way or that the security
                of The Builder Network Platform has been compromised in any way.
              </p>
              <p>
                3.3. Except as permitted by applicable law which you and we
                cannot agree to exclude, you shall not:
              </p>
              <p>
                3.3.1. attempt to copy, modify, duplicate, create derivative
                works from, frame, mirror, republish, download, display,
                transmit, or distribute all or any portion of The Builder
                Network Platform in any form or media or by any means;
              </p>
              <p>
                3.3.2. attempt to de-compile, reverse compile, disassemble,
                reverse engineer or otherwise reduce to human-perceivable form
                all or any part of The Builder Network Platform;
              </p>
              <p>
                3.3.3. access all or any part of The Builder Network Platform to
                build a competing product or service;
              </p>
              <p>3.3.4. create multiple accounts;</p>
              <p>
                3.3.5. use any data from The Builder Network Platform for the
                development of any software programme (including but not limited
                to training a machine learning or artificial intelligence
                system); or
              </p>
              <p>
                3.3.6. use any manual or automated software, devices, or other
                processes (including but not limited to spiders, robots,
                scrapers, crawlers, avatars, data mining tools or the like) to
                scrape, harvest, or download data from The Builder Network
                Platform.
              </p>
              <p>
                3.4. We aim to make The Builder Network Platform available to
                you and to Tradespeople on a 24/7 basis. We reserve the right to
                take The Builder Network Platform or any part of it offline as
                reasonably required for routine and emergency maintenance and
                repairs. We will aim to give you as much notice of such downtime
                as may be reasonable. All communications using the internet may
                be affected by events outside our reasonable control.
              </p>
              <p>
                3.5. You understand that in providing The Builder Network
                Platform we are reliant on services supplied by third party
                providers. To the extent permitted by law, we will be excused
                for default or delay of performance and will have no liability
                to the extent that such default or delay is caused by any defect
                or deficiency in any products or services provided by any third
                party provider.
              </p>

              <h3>4. Content</h3>
              <p>
                4.1. You are responsible for all Content that you upload to,
                communicate or make available via The Builder Network Platform.
                Such Content must not include any profanities, any racial slurs,
                sexist remarks or any other rude, abusive or offensive language,
                or your contact details or links to any other websites. If you
                post any Content which we consider is in violation of this
                clause 4.1 we have the right to suspend or terminate your access
                to The Builder Network Platform in accordance with clause 10.1.
              </p>
              <p>
                4.2. You understand that The Builder Network does not pre-screen
                or approve all Content. However, The Builder Network shall have
                the right but not the obligation and at its sole discretion to
                monitor, remove or alter any Content that is available on The
                Builder Network Platform for any reason whatsoever. For more
                information on Feedback please see clause 8.
              </p>

              <h3>5. Intellectual Property</h3>
              <p>
                5.1. The Builder Network is the owner or licensor of all the
                intellectual property rights in and relating to The Builder
                Network Platform, including the designs, text, database,
                graphics and layouts. We grant you a limited, non-exclusive,
                non-transferable licence to access and use The Builder Network
                Platform for the purposes set out in this Agreement.
              </p>
              <p>
                5.2. In the event that you use any of the intellectual property
                owned by The Builder Network other than as expressly set out in
                this Agreement, we may suspend or terminate your Customer
                Account and we reserve all rights to take the appropriate legal
                action against you.
              </p>

              <h3>6. Data Protection</h3>
              <p>
                6.1. The Builder Network is a data controller of the personal
                data you provide to us and we collect about you in the course of
                our provision of The Builder Network Platform to you.
              </p>
              <p>
                6.2. We will process your personal data as set out in our
                Customer Privacy Policy, as updated or amended by us from time
                to time.
              </p>

              <h3>7. Posting Jobs and engaging Tradespeople</h3>
              <p>
                7.1. You can post a Job on The Builder Network Platform to find
                suitable Tradespeople near you. Our matching system will then
                identify and alert relevant Tradespeople, who can then Express
                Interest in your Job. You can review interested Tradespeople by
                reading their profiles, work history and Feedback. Your contact
                details will then be shared with any Tradesperson you add to
                your Shortlist. We cannot guarantee that any particular
                Tradespeople will Express Interest in your Job or your
                enquiries.
              </p>
              <p>
                7.2. Your interactions (including quotes, payment and receipt of
                goods or services and/or any other terms of your Service
                Agreements) with Tradespeople found through The Builder Network
                Platform are solely between you and such Tradespeople.
              </p>
              <p>
                7.3. You agree that The Builder Network shall not be responsible
                or liable for any loss or damage of any sort incurred as the
                result of any such interactions. If there is a dispute between
                you and a Tradesperson or between you and any third party, you
                understand and agree that The Builder Network is under no
                obligation to become involved.
              </p>
              <p>
                7.4. In the event that you do have a dispute with a
                Tradesperson, you hereby release The Builder Network, its
                officers, employees, agents and successors in rights from any
                and all losses, claims, demands and damages (actual and
                consequential) of every kind or nature, known or unknown,
                suspected and unsuspected, disclosed and undisclosed, arising
                out of or in any way related to such disputes other than to the
                extent arising from our breach of this Agreement. Nothing in
                this clause 7.4 limits or excludes either party's liability for
                anything which cannot be limited or excluded.
              </p>
              <p>
                7.5. The Builder Network will not be involved or held liable for
                any Service Agreement between you and the Tradesperson and The
                Builder Network is not a party to any Service Agreement,
                contract or other agreement that may arise between you and the
                Tradesperson as a result of your use of The Builder Network
                Platform. It is for the Customer to verify before entering into
                a Service Agreement with any Tradesperson, details such as
                confirmation of insurance cover, the tradesperson’s
                qualifications and any other documentation or information to
                ensure they are comfortable to employ the Tradesperson.
                Accordingly, we are not liable for any loss or damage that you
                incur resulting from any such agreement. This clause shall
                survive the termination of this Agreement.
              </p>

              <h3>8. Customer Feedback</h3>
              <p>
                8.1. Once a Service Agreement is in place in respect of your Job
                and that Job has started and/or you have paid money to the
                Tradesperson, you may provide Feedback in respect of the
                relevant Tradesperson.
              </p>
              <p>8.2. You shall not:</p>
              <p>
                8.2.1. submit any Feedback falsely posing as a genuine Customer;
              </p>
              <p>
                8.2.2. post any Feedback for which you have been paid or
                otherwise incentivised;
              </p>
              <p>
                8.2.3. post any Feedback that contains any offensive, vulgar,
                obscene or racist language;
              </p>
              <p>
                8.2.4. post any Feedback that contains personal data relating to
                the Tradesperson; or
              </p>
              <p>8.2.5. otherwise submit any false or misleading Feedback.</p>
              <p>
                8.3. You acknowledge and agree that we perform a number of
                checks on Feedback with the aim of ensuring that Feedback is
                authentic and posted by a genuine Customer and we may remove
                Feedback that appears to be fake or fraudulent, or at the
                request of the author of such Feedback, at our sole discretion.
              </p>
              <p>
                8.4. You acknowledge and agree that we can disclose the poster
                of the Feedback to the Tradesperson it concerns.
              </p>

              <h3>9. Liability</h3>
              <p>
                9.1. Liability shall not be limited by either party in respect
                of:
              </p>
              <p>9.1.1. death or personal injury caused by its negligence;</p>
              <p>9.1.2. fraud or fraudulent misrepresentation; or</p>
              <p>
                9.1.3. any other liability which cannot be limited or excluded
                by law.
              </p>
              <p>
                9.2. Subject to clause 9.1, The Builder Network is responsible
                for losses you suffer caused by us breaching this Agreement
                unless the loss is:
              </p>
              <p>
                9.2.1. unexpected or unforeseeable. It was not obvious that it
                would happen and nothing you said to us before entering into
                this Agreement meant we should have expected it;
              </p>
              <p>
                9.2.2. caused by a delaying event outside our control. As long
                as we have taken the steps set out in clause 13.1 we're not
                responsible for delays outside our control;
              </p>
              <p>
                9.2.3. avoidable. Something you could have avoided by taking
                reasonable action;
              </p>
              <p>9.2.4. a business loss.</p>

              <h3>10. Termination and suspension</h3>
              <p>
                10.1. We can end this Agreement and your right to use The
                Builder Network Platform if you have breached this Agreement or
                any part of this Agreement.
              </p>
              <p>
                10.2. We will give you at least thirty (30) days' notice that we
                are ending this Agreement as set out above, unless:
              </p>
              <p>
                10.2.1. our legal, regulatory or tax obligations require us to
                end this Agreement sooner;
              </p>
              <p>
                10.2.2. it is necessary for us to end this Agreement sooner or
                immediately, including (without limitation) if we reasonably
                believe that you present a danger to Tradespeople or are acting
                fraudulently; or
              </p>
              <p>10.2.3. you have repeatedly breached this Agreement.</p>
              <p>
                10.3. Without prejudice to clause 10.1, we may terminate and/or
                suspend your access to The Builder Network Platform at any time
                if we believe there is a legal, regulatory, security or
                reputational risk to The Builder Network, The Builder Network
                Platform, Tradespeople or other Customers.
              </p>
              <p>
                10.4. If we suspend or terminate your Customer Account and/or
                access to The Builder Network Platform, we will in most cases
                provide you with a statement of reasons on a durable medium for
                such suspension or termination at the time of such suspension or
                termination setting out the specific facts or circumstances
                which led to our decision and the grounds on which we are
                suspending or terminating this Agreement. However, we won't give
                you such a statement if:
              </p>
              <p>
                10.4.1. we're subject to a legal, tax or regulatory obligation
                not to provide the specific facts or circumstances or to set out
                our reasons; or
              </p>
              <p>10.4.2. you have repeatedly breached this Agreement.</p>
              <p>
                10.5. You agree that The Builder Network shall have no liability
                to you or any third party for any termination or suspension of
                your access to The Builder Network Platform.
              </p>
              <p>
                10.6. You agree not to attempt to use The Builder Network
                Platform after this Agreement has been terminated or if your
                access to The Builder Network Platform has been suspended.
              </p>
              <p>
                10.7. You may stop using The Builder Network Platform at any
                time, and you can end this Agreement and delete your Customer
                Account by selecting that option and following the steps set out
                in your Customer Account.
              </p>

              <h3>11. Complaints and Disputes</h3>
              <p>
                11.1. If you have a complaint about The Builder Network, please
                Contact Us.
              </p>
              <p>11.2. On receipt of a complaint, we will:</p>
              <p>
                11.2.1. carefully consider the complaint and, if necessary,
                follow up in order to adequately address any issues raised;
              </p>
              <p>
                11.2.2. process the complaint within a reasonable period of time
                taking into account the importance and complexity of the issue
                raised; and
              </p>
              <p>
                11.2.3. inform the complainant of the result of our complaint
                handling process.
              </p>
              <p>
                We try to resolve all complaints by amicable and reasonable
                discussion. If the complaint cannot be resolved in this way,
                either of us can request mediation in accordance with clause
                11.3.
              </p>
              <p>
                11.3. Alternative dispute resolution is an optional process
                where an independent body considers the facts of a dispute and
                seeks to resolve it, without you having to go to court. You can
                submit a complaint to the Centre for Effective Dispute
                Resolution (“CEDR”) through their website at
                www.cedr.com/submit-a-complaint/. CEDR does not charge you for
                making a complaint. If you're not satisfied with the outcome you
                can still go to court.
              </p>

              <h3>12. Changes</h3>
              <p>
                12.1. We will let you know via email, message on The Builder
                Network Platform or another durable medium about any changes we
                are making to this Agreement, unless they are minor amendments
                which do not alter the content or meaning of this Agreement. We
                will normally give you fifteen (15) days' notice before such
                changes take effect.
              </p>
              <p>
                12.2. We will give you more notice if a change we are making
                impacts on the way you carry out your business or services.
              </p>
              <p>
                12.3. We won't give you advance notice in limited circumstances
                if we have to make a change with immediate effect, such as for
                legal or regulatory reasons or to protect The Builder Network
                Platform, Tradespeople or Customers from fraud, malware, data
                breaches or other security risks.
              </p>
              <p>
                12.4. If you do not want to accept the changes we are making,
                you may end this Agreement in accordance with clause 10.7.
              </p>

              <h3>13. Other important terms</h3>
              <p>13.1. Force majeure</p>
              <p>
                13.1.1. Neither you nor we shall be in breach of this Agreement
                or otherwise liable for any failure or delay in performing their
                obligations if such delay or failure results from events,
                circumstances or causes beyond the affected party's reasonable
                control. The time for performance of such obligations shall be
                extended accordingly. If the period of delay or non-performance
                continues for thirty (30) days, the party not affected may end
                this Agreement by giving ten (10) days' prior written notice.
                The party affected shall take reasonable steps to prevent or
                minimise any delay or non-performance.
              </p>
              <p>13.2. Assignment</p>
              <p>
                13.2.1. We can transfer this Agreement with you, so that a
                different organisation is responsible for supplying The Builder
                Network Platform. We'll tell you in writing if this happens and
                we'll ensure that the transfer won't affect your rights under
                this Agreement.
              </p>
              <p>13.3. Entire agreement</p>
              <p>
                13.3.1. This Agreement constitutes the entire agreement between
                you and us in relation to the provision of The Builder Network
                Platform. Both you and we acknowledge that in entering into this
                Agreement neither of us relies on any statement, representation,
                assurance or warranty (whether made innocently or negligently)
                that is not set out in this Agreement.
              </p>
              <p>13.4. Third party rights</p>
              <p>
                13.4.1. Nobody else has any rights under this Agreement. This
                Agreement is between you and us. Nobody else can enforce it and
                neither of us will need to ask anybody else to sign-off on
                ending or changing it.
              </p>
              <p>13.5. Invalidity</p>
              <p>
                13.5.1. If a court invalidates some of this Agreement, the rest
                of it will still apply. If a court or other authority decides
                that some of these terms are unlawful, the rest will continue to
                apply.
              </p>
              <p>13.6. Waiver</p>
              <p>
                13.6.1. Even if we delay in enforcing this Agreement, we can
                still enforce it later. We might not immediately chase you for
                not doing something or for doing something you're not allowed
                to, but that doesn't mean we can't do it later.
              </p>
              <p>13.7. Severance</p>
              <p>
                13.7.1. If any provisions hereof are held to be illegal or
                unenforceable, such provisions shall be severed and the
                remainder of this Agreement shall remain in full force and
                effect unless the business purpose of this Agreement is
                substantially frustrated.
              </p>
              <p>13.8. Governing Law & Jurisdiction</p>
              <p>
                13.8.1. This Agreement shall be governed by and construed in
                accordance with English law. Disputes arising in connection with
                this Agreement shall be subject to the jurisdiction of the
                English courts. If you live in Wales, Scotland or Northern
                Ireland, you can also bring claims against us in the courts of
                the country you live in. We can also claim against you in the
                courts of the country you live in.
              </p>
              <p className="text-sm text-muted-foreground mt-8">
                Updated: 26 February 2024
              </p>
            </TabsContent>
          </Tabs>
        </div>
      </main>
  );
};

export default Terms;
