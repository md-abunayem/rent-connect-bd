import { useState } from 'react';
import { Languages, Copy, Volume2, ArrowRightLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const LanguageTranslator = () => {
  const [banglaText, setBanglaText] = useState('');
  const [englishText, setEnglishText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const { toast } = useToast();

  // Mock translation function - in a real app, this would call a translation API
  const translateText = async (text: string, fromBangla: boolean = true) => {
    setIsTranslating(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock translations for demo purposes
    const mockTranslations: Record<string, string> = {
      'আমি একজন ছাত্র': 'I am a student',
      'আমার একটি রুম দরকার': 'I need a room',
      'কত টাকা ভাড়া?': 'What is the rent?',
      'এটি কি নিরাপদ?': 'Is this safe?',
      'আমি কখন দেখতে পারি?': 'When can I visit?',
      'I am a student': 'আমি একজন ছাত্র',
      'I need a room': 'আমার একটি রুম দরকার',
      'What is the rent?': 'কত টাকা ভাড়া?',
      'Is this safe?': 'এটি কি নিরাপদ?',
      'When can I visit?': 'আমি কখন দেখতে পারি?'
    };

    const translated = mockTranslations[text] || `Translated: ${text}`;
    
    if (fromBangla) {
      setEnglishText(translated);
    } else {
      setBanglaText(translated);
    }
    
    setIsTranslating(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Text copied to clipboard",
    });
  };

  const speakText = (text: string, lang: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'bn' ? 'bn-BD' : 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  const swapTexts = () => {
    const tempBangla = banglaText;
    const tempEnglish = englishText;
    setBanglaText(tempEnglish);
    setEnglishText(tempBangla);
  };

  const quickPhrases = [
    { bangla: 'আমি একজন ছাত্র', english: 'I am a student' },
    { bangla: 'আমার একটি রুম দরকার', english: 'I need a room' },
    { bangla: 'কত টাকা ভাড়া?', english: 'What is the rent?' },
    { bangla: 'এটি কি নিরাপদ?', english: 'Is this safe?' },
    { bangla: 'আমি কখন দেখতে পারি?', english: 'When can I visit?' },
  ];

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-strong border-0 gradient-card">
      <CardHeader className="text-center pb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 gradient-primary rounded-xl shadow-glow">
            <Languages className="w-6 h-6 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Bangla ↔ English Translator
          </CardTitle>
        </div>
        <p className="text-muted-foreground">
          Communicate easily with landlords and property managers
        </p>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* Translation Interface */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bangla Input */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                বাংলা (Bangla)
              </Badge>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => speakText(banglaText, 'bn')}
                  disabled={!banglaText}
                >
                  <Volume2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(banglaText)}
                  disabled={!banglaText}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <Textarea
              placeholder="বাংলায় টাইপ করুন..."
              value={banglaText}
              onChange={(e) => setBanglaText(e.target.value)}
              className="min-h-[120px] text-lg border-2 focus:border-primary/50 transition-colors"
              dir="auto"
            />
            <Button
              onClick={() => translateText(banglaText, true)}
              disabled={!banglaText || isTranslating}
              className="w-full gradient-primary hover:scale-105 transition-all shadow-medium"
            >
              {isTranslating ? 'Translating...' : 'Translate to English'}
            </Button>
          </div>

          {/* Swap Button */}
          <div className="flex md:hidden justify-center">
            <Button
              variant="outline"
              size="icon"
              onClick={swapTexts}
              className="rounded-full border-2 hover:border-primary hover:bg-primary/5"
            >
              <ArrowRightLeft className="w-4 h-4" />
            </Button>
          </div>

          {/* English Input */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                English
              </Badge>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => speakText(englishText, 'en')}
                  disabled={!englishText}
                >
                  <Volume2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(englishText)}
                  disabled={!englishText}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <Textarea
              placeholder="Type in English..."
              value={englishText}
              onChange={(e) => setEnglishText(e.target.value)}
              className="min-h-[120px] text-lg border-2 focus:border-accent/50 transition-colors"
            />
            <Button
              onClick={() => translateText(englishText, false)}
              disabled={!englishText || isTranslating}
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground hover:scale-105 transition-all shadow-medium"
            >
              {isTranslating ? 'Translating...' : 'Translate to Bangla'}
            </Button>
          </div>
        </div>

        {/* Desktop Swap Button */}
        <div className="hidden md:flex justify-center -my-4">
          <Button
            variant="outline"
            size="icon"
            onClick={swapTexts}
            className="rounded-full border-2 hover:border-primary hover:bg-primary/5 bg-background shadow-medium"
          >
            <ArrowRightLeft className="w-4 h-4" />
          </Button>
        </div>

        {/* Quick Phrases */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">
            Quick Phrases for Housing
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {quickPhrases.map((phrase, index) => (
              <div
                key={index}
                className="p-4 rounded-xl border-2 border-muted hover:border-primary/30 hover:bg-primary/5 transition-all cursor-pointer group"
                onClick={() => {
                  setBanglaText(phrase.bangla);
                  setEnglishText(phrase.english);
                }}
              >
                <div className="space-y-2">
                  <p className="text-sm text-primary font-medium group-hover:text-primary-dark">
                    {phrase.bangla}
                  </p>
                  <p className="text-sm text-accent group-hover:text-accent-foreground">
                    {phrase.english}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LanguageTranslator;