import React from 'react';
import logo from '../assets/logo.svg';

const pageData = {
    hero: {
        title: "Welcome to",
        description: "The modern task management platform that helps teams stay organized, productive, and focused on what matters most.",
        buttons: [
            { text: "Get Started", onClick: () => {} },
            { text: "Try Demo", onClick: () => {} }
        ]
    },
    features: [
        {
            title: "Kanban Boards",
            description: "Organize your tasks with intuitive drag-and-drop boards"
        },
        {
            title: "Team Collaboration",
            description: "Work together seamlessly with your team members"
        },
        {
            title: "Fast & Responsive",
            description: "Lightning-fast performance with real-time updates"
        },
        {
            title: "Secure & Private",
            description: "Your data is protected with enterprise-grade security"
        }
    ],
    cta: {
        title: "Ready to boost your productivity?",
        description: "Join thousands of teams already using DragMe to manage their projects efficiently.",
        buttonText: "Start Your Journey"
    }
};

function WelcomePage() {
    return (
        <main className="container bg">
            <section className="get-started">
                <h1 className="text">{pageData.hero.title} <img width={200} src={logo} alt="logo" /></h1>
                <p className="span-text">{pageData.hero.description}</p>
                <div className="welcome-buttons">
                    {pageData.hero.buttons.map((button, index) => (
                        <button 
                            key={index}
                            className="button-bg button-border text"
                            onClick={button.onClick}
                        >
                            {button.text}
                        </button>
                    ))}
                </div>
            </section>

            <section className="features">
                {pageData.features.map((feature, index) => (
                    <div key={index} className="card-bg">
                        <h3 className="text">{feature.title}</h3>
                        <p className="span-text">{feature.description}</p>
                    </div>
                ))}
            </section>

            <section className="card-bg boost-productivity">
                <h2 className="text">{pageData.cta.title}</h2>
                <p className="span-text">{pageData.cta.description}</p>
                <button className="button-bg button-border text">
                    {pageData.cta.buttonText}
                </button>
            </section>
        </main>
    );
}

export default WelcomePage;