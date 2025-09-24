import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  MessageCircle, 
  Mic, 
  MicOff, 
  Send, 
  Volume2, 
  VolumeX,
  Waves,
  X,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { useSpeechSynthesis, useSpeechRecognition } from 'react-speech-kit';
import { useAuth } from '@/hooks/useAuth';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'samudhran';
  timestamp: Date;
  language?: string;
}

export const SamudhranAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const { speak, cancel, speaking, supported: ttsSupported } = useSpeechSynthesis();
  const {
    listen,
    listening,
    stop,
    supported: sttSupported
  } = useSpeechRecognition({
    onResult: (result: string) => {
      setInputText(result);
    },
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (user && messages.length === 0) {
      const welcomeMessage: Message = {
        id: '1',
        text: `नमस्ते ${user.name}! I'm Samudhran 🌊, your AI assistant for marine data exploration. I can help you with data analysis, visualization, uploads, and answer questions in multiple Indian languages. How can I assist you today?`,
        sender: 'samudhran',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [user, messages.length]);

  const generateResponse = async (userMessage: string): Promise<string> => {
    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const responses = [
      `I understand you're asking about "${userMessage}". Based on our marine database, I can help you analyze oceanographic patterns and species distribution data.`,
      `That's an interesting question about marine ecology! Let me guide you through the relevant datasets and visualization tools available in our platform.`,
      `मैं आपकी समुद्री डेटा के बारे में सवाल को समझ गया हूं। CMLRE प्लेटफॉर्म में कई विश्लेषण उपकरण उपलब्ध हैं।`,
      `Based on your role as ${user?.role}, I can help you access the appropriate marine research tools and datasets. Would you like me to show you the data visualization dashboard?`,
      `I can assist with data upload, species identification, molecular analysis, and generating reports. What specific marine research task would you like to work on?`
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsThinking(true);

    try {
      const response = await generateResponse(inputText);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'samudhran',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      
      // Auto-speak the response
      if (ttsSupported && !speaking) {
        speak({ text: response, rate: 0.9, pitch: 1.1 });
      }
    } catch (error) {
      console.error('Failed to generate response:', error);
    } finally {
      setIsThinking(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleListening = () => {
    if (listening) {
      stop();
    } else {
      listen({ continuous: false, interimResults: false });
    }
  };

  if (!isOpen) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-ocean-medium to-ocean-shallow hover:from-ocean-deep hover:to-ocean-medium shadow-lg"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Waves className="w-8 h-8" />
          </motion.div>
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <Card className={`backdrop-blur-sm bg-card/95 border-ocean-surface/20 shadow-2xl transition-all duration-300 ${
        isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-ocean-surface/20">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Waves className="w-6 h-6 text-ocean-surface" />
            </motion.div>
            <div>
              <h3 className="font-semibold text-sm">Samudhran AI</h3>
              <p className="text-xs text-muted-foreground">Marine Data Assistant</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="hover:bg-ocean-surface/20"
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="hover:bg-destructive/20 hover:text-destructive"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <ScrollArea className="flex-1 p-4 h-[400px]">
              <div className="space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg text-sm ${
                        message.sender === 'user'
                          ? 'bg-ocean-medium text-white'
                          : 'bg-ocean-surface/20 text-foreground'
                      }`}
                    >
                      {message.text}
                    </div>
                  </motion.div>
                ))}
                
                {isThinking && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-ocean-surface/20 p-3 rounded-lg">
                      <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="flex gap-1"
                      >
                        <div className="w-2 h-2 bg-ocean-medium rounded-full" />
                        <div className="w-2 h-2 bg-ocean-medium rounded-full" />
                        <div className="w-2 h-2 bg-ocean-medium rounded-full" />
                      </motion.div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t border-ocean-surface/20">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Input
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about marine data..."
                    className="pr-12"
                  />
                  {sttSupported && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`absolute right-1 top-1/2 transform -translate-y-1/2 ${
                        listening ? 'text-coral-warm' : 'text-muted-foreground'
                      }`}
                      onClick={toggleListening}
                    >
                      {listening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </Button>
                  )}
                </div>
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isThinking}
                  className="bg-ocean-medium hover:bg-ocean-deep"
                >
                  <Send className="w-4 h-4" />
                </Button>
                {ttsSupported && (
                  <Button
                    variant="outline"
                    onClick={() => speaking ? cancel() : null}
                    className={speaking ? 'text-coral-warm' : ''}
                  >
                    {speaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </Button>
                )}
              </div>
              
              {listening && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-2 text-xs text-coral-warm flex items-center gap-2"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <Mic className="w-3 h-3" />
                  </motion.div>
                  Listening... (Supports Hindi, Tamil, Telugu, Kannada, etc.)
                </motion.div>
              )}
            </div>
          </>
        )}
      </Card>
    </motion.div>
  );
};