import React from 'react';
import SectionTitle from './components/SectionTitle';
import Benefits from './components/Benefits';
import Testimonials from './components/Testimonials';
import Faq from './components/Faq';
import Cta from './components/Cta';
import Footer from './components/Footer';
import { benefitOne, benefitTwo } from './utils/data';
import Navbar from './components/Navbar2';
import Hero from './components/Hero';

const Home: React.FC = () => {
    return (
        <div className="bg-gray-100 dark:bg-slate-800 px-24 flex min-h-screen flex-col justify-start items-center">
            {/* <div className="container mx-auto">
                <h1 className="text-4xl font-bold text-center mb-8">Welcome to Your Website</h1>
                <p className="text-lg text-center text-gray-700">This is a beautiful landing page created with Next.js, Tailwind CSS, and TypeScript.</p>
            </div> */}
            <Navbar />
            <Hero />
            <SectionTitle pretitle="Community Events Benefits" title=" Why should you use Community Events">
                Community Events is a free website for creating your own events and attend the events that your community created.
            </SectionTitle>
            <Benefits data={benefitOne} />
            <Benefits imgPos="right" data={benefitTwo} />
            <SectionTitle pretitle="Watch a video" title="Learn how to fullfil your needs">
                This section is to highlight a promo or demo video of your product. Analysts says a landing page with video has 3% more conversion rate. So, don&apos;t forget to add one. Just like
                this.
            </SectionTitle>
            <SectionTitle pretitle="Testimonials" title="Here's what our customers said">
                Testimonails is a great way to increase the brand trust and awareness. Use this section to highlight your popular customers.
            </SectionTitle>
            <Testimonials />
            <SectionTitle pretitle="FAQ" title="Frequently Asked Questions">
                Answer your customers possible questions here, it will increase the conversion rate as well as support or chat requests.
            </SectionTitle>
            <Faq />
            <Cta />
            <Footer />
        </div>
    );
};

export default Home;
