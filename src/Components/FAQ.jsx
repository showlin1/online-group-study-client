
const FAQ = () => {
    return (
        <div className="pt-20">
            <div className="pb-10">
                <h1 className="text-2xl font-semibold text-center text-cyan-600 capitalize lg:text-3xl">
                    FAQ!
                </h1>

                <div className="flex justify-center mx-auto mt-6">
                    <span className="inline-block w-40 h-1 bg-cyan-600 rounded-full"></span>
                    <span className="inline-block w-3 h-1 mx-1 bg-cyan-600 rounded-full"></span>
                    <span className="inline-block w-1 h-1 bg-cyan-600 rounded-full"></span>
                </div>
            </div>
            <section className="max-w-3xl mx-auto">
                <div className="flex flex-col justify-center px-4 py-8 mx-auto md:p-8">
                    <h2 className="text-2xl font-semibold sm:text-4xl text-center">Frequently Asked Questions</h2>
                    <p className="mt-4 mb-8 "></p>
                    <div className="space-y-4">
                        <details className="w-full border rounded-lg">
                            <summary className="px-4 py-6 focus:outline-none focus-visible:ring-violet-400 font-semibold text-xl">How do I join a study group?</summary>
                            <p className="px-4 py-6 pt-0 ml-4 -mt-4 ">To join a study group, you can register and login to the online group study website.</p>
                        </details>
                        <details className="w-full border rounded-lg">
                            <summary className="px-4 py-6 focus:outline-none focus-visible:ring-violet-400 font-semibold text-xl">How do I participate in a group study session?</summary>
                            <p className="px-4 py-6 pt-0 ml-4 -mt-4 ">Once you're a member of a group, you can join any ongoing study sessions by clicking on the create Assignment page, assignments link. You can contribute by create assignment, sharing documents, and using the collaboration tools provided.</p>
                        </details>
                        <details className="w-full border rounded-lg">
                            <summary className="px-4 py-6 focus:outline-none focus-visible:ring-violet-400 font-semibold text-xl">Can I create my own Assignment?</summary>
                            <p className="px-4 py-6 pt-0 ml-4 -mt-4 ">Absolutely! Click on "Create Assignment Page" in your dashboard, fill in the necessary details about your Assignment,
                                and others person view the assignment. You can manage  your Assignment page.</p>
                        </details>
                        <details className="w-full border rounded-lg">
                            <summary className="px-4 py-6 focus:outline-none focus-visible:ring-violet-400 font-semibold text-xl">Can I cancel or modify my Assignment?</summary>
                            <p className="px-4 py-6 pt-0 ml-4 -mt-4 ">Yes, you can cancel or modify your Assignment. The cancellation and modification policies vary depending on your  creating Assignment. Please refer to your creating Assignment confirmation email for specific details, or log into your account to manage your Assignment.</p>
                        </details>
                        <details className="w-full border rounded-lg">
                            <summary className="px-4 py-6 focus:outline-none focus-visible:ring-violet-400 font-semibold text-xl">How can I contact user support?</summary>
                            <p className="px-4 py-6 pt-0 ml-4 -mt-4 ">You can contact our user support team through various channels.
                                We offer support via phone, email, and live chat. For immediate assistance, use the live chat feature on our website, or call our toll-free number. Our support team is here to help with any questions or issues you may have regarding your Assignment.</p>
                        </details>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FAQ;