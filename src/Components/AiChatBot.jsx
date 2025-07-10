import { useRef, useState, useEffect } from 'react';
// import './ShoeBot.css';
import ShoeChat from './ShoeChat';
import { MessageCircleMore } from 'lucide-react';


export default function AiChatBot() {
  const [opened, setOpened] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [view, setView] = useState(null); // 'faq' or 'chat'
  const [messages, setMessages] = useState([]);
  const botRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        opened &&
        botRef.current &&
        !botRef.current.contains(event.target)
      ) {
        setIsClosing(true);
        setTimeout(() => {
          setIsClosing(false);
          setOpened(false);
          setView(null);
          setMessages([]);
        }, 400);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [opened]);

  const faqResponses = {
    "How can I place an order?":
      "To place an order, go to the product page, select your size, click 'Add to Bag', then click the bag icon to checkout.",
    "Do you ship internationally?":
      "Yes, we ship to many countries worldwide. You can select your destination during checkout.",
    "What is your return policy?":
      "We accept returns within 14 days for unworn shoes.",
    "Do you offer size guides?":
      "Yes, a size guide is available on every product page.",
    "Where is your store located?":
      "We are currently an online-only store. All orders are shipped directly to your address."
  };

  const toggleBot = () => {
    if (opened) {
      setIsClosing(true);
      setTimeout(() => {
        setIsClosing(false);
        setOpened(false);
        setView(null);
        setMessages([]);
      }, 400);
    } else {
      setOpened(true);
      setView('faq');
    }
  };

  const handleFaqClick = (question) => {
    const answer = faqResponses[question];
    setMessages(prev => [
      ...prev,
      { text: question, sender: 'user' },
      { text: answer, sender: 'bot' }
    ]);
    setView('chat');
  };

  const handleOtherQuestion = () => {
    setView('chat');
  };

  const handleBack = () => {
    setView('faq');
  };

  return (
    <div className="shoe-bot-widget">
      <div ref={botRef} className={`shoe-bot-box ${opened ? 'open' : ''} ${isClosing ? 'closed' : ''}`}>
        {opened && !isClosing && (
          <button className="chat-close-button" onClick={toggleBot}>X</button>
        )}
        <div className="inner-content">
          {view === 'faq' && (
            <div className="fade-slide">
              <p className="greeting">
                Welcome! <br />
                How can I assist you today?
              </p>
              <ul className="options-list fade-slide">
                {Object.keys(faqResponses).map((q, i) => (
                  <li key={i} onClick={() => handleFaqClick(q)}>
                    {q}
                  </li>
                ))}
                <li onClick={handleOtherQuestion} className="chat-option">
                  I have another question...
                </li>
              </ul>
            </div>
          )}

          {view === 'chat' && (
            <div className="fade-slide chat-box">
              <ShoeChat
                messages={messages}
                setMessages={setMessages}
                onBack={handleBack}
              />
            </div>
          )}
        </div>
      </div>

      <button className="hermes-style-toggle" onClick={toggleBot} aria-label="Chatbot">
  <MessageCircleMore size={20} strokeWidth={1.5} />
</button>
          
  

        
      </div>
    
  );
}

