import { useState, useCallback } from 'react';
import { useBillingStore } from '../store/useBillingStore';
import { useInventoryStore } from '../store/useInventoryStore';
import Fuse from 'fuse.js';

interface VoiceAssistantState {
  isListening: boolean;
  transcript: string;
  error: string | null;
}

export function useVoiceAssistant() {
  const [state, setState] = useState<VoiceAssistantState>({
    isListening: false,
    transcript: '',
    error: null,
  });

  const { addItem, setClientName, clearInvoice, removeItemByName } = useBillingStore();
  const { products } = useInventoryStore();

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    // Use a natural sounding voice if available
    const voices = window.speechSynthesis.getVoices();
    const premiumVoice = voices.find(v => v.name.includes('Google') || v.name.includes('Premium'));
    if (premiumVoice) utterance.voice = premiumVoice;
    utterance.rate = 1.1;
    window.speechSynthesis.speak(utterance);
  };

  const processCommand = useCallback((command: string) => {
    const text = command.toLowerCase().trim();
    console.log('Voice Command:', text);

    // Fuse.js for product matching
    const fuse = new Fuse(products, {
      keys: ['name', 'category'],
      threshold: 0.4,
    });

    // Helper to convert text numbers to digits
    const textToNum = (text: string) => {
      const map: { [key: string]: number } = {
        'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5,
        'six': 6, 'seven': 7, 'eight': 8, 'nine': 9, 'ten': 10
      };
      return map[text] || parseInt(text);
    };

    // 1. ADD ITEM COMMAND
    const addRegex = /(?:add|put|insert)\s+(?:(\d+|one|two|three|four|five|six|seven|eight|nine|ten)\s+)?(.*?)(?:\s+(?:at|for|price|of)\s+(\d+))?$/i;
    const addMatch = text.match(addRegex);

    if (addMatch && !text.includes('remove') && !text.includes('delete')) {
      const quantity = textToNum(addMatch[1]) || 1;
      let itemName = addMatch[2].trim();
      let price = parseInt(addMatch[3]) || 0;

      const results = fuse.search(itemName);
      if (results.length > 0) {
        const product = results[0].item;
        itemName = product.name;
        if (!price) price = product.price;
        
        addItem({ name: itemName, quantity, price });
        speak(`Added ${quantity} ${itemName} to bill.`);
        return true;
      } else if (itemName) {
        addItem({ name: itemName, quantity, price: price || 0 });
        speak(`Added ${quantity} ${itemName} to bill.`);
        return true;
      }
    }

    // 2. REMOVE ITEM COMMAND
    const removeRegex = /(?:remove|delete|discard)\s+(?:(\d+|one|two|three|four|five|six|seven|eight|nine|ten)\s+)?(.*?)$/i;
    const removeMatch = text.match(removeRegex);
    if (removeMatch) {
      const quantity = textToNum(removeMatch[1]) || 0;
      const itemName = removeMatch[2].trim();
      removeItemByName(itemName, quantity);
      
      if (quantity > 0) {
        speak(`Reduced ${itemName} by ${quantity}.`);
      } else {
        speak(`Removed ${itemName} from bill.`);
      }
      return true;
    }

    // 3. CLIENT COMMAND
    const clientRegex = /(?:set client|bill to|customer|client name)\s+(.*)/i;
    const clientMatch = text.match(clientRegex);
    if (clientMatch) {
      const name = clientMatch[1].trim();
      setClientName(name);
      speak(`Customer set to ${name}`);
      return true;
    }

    // 4. CLEAR COMMAND
    if (text.includes('clear bill') || text.includes('reset invoice') || text.includes('clear invoice') || text.includes('new bill')) {
      clearInvoice();
      speak('Starting a new invoice.');
      return true;
    }

    // 5. HELP
    if (text.includes('help') || text.includes('what can i say')) {
      speak('You can say: add 2 notebooks, remove keyboard, set client Alex, or clear bill');
      return true;
    }

    // If no command matched, maybe it's just a product name?
    // Only do this if it doesn't look like a "remove" or "delete" attempt
    if (!text.includes('remove') && !text.includes('delete')) {
      const directResults = fuse.search(text);
      if (directResults.length > 0) {
        const product = directResults[0].item;
        addItem({ name: product.name, quantity: 1, price: product.price });
        speak(`Added ${product.name} to bill.`);
        return true;
      }
    }

    return false;
  }, [addItem, setClientName, clearInvoice, removeItemByName, products]);

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setState(s => ({ ...s, error: 'Speech recognition not supported in this browser.' }));
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.continuous = false;

    recognition.onstart = () => {
      setState(s => ({ ...s, isListening: true, transcript: '', error: null }));
    };

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0])
        .map((result: any) => result.transcript)
        .join('');
      
      setState(s => ({ ...s, transcript }));

      if (event.results[0].isFinal) {
        processCommand(transcript);
        stopListening();
      }
    };

    recognition.onerror = (event: any) => {
      setState(s => ({ ...s, error: event.error === 'no-speech' ? null : event.error, isListening: false }));
    };

    recognition.onend = () => {
      setState(s => ({ ...s, isListening: false }));
    };

    (window as any).recognition = recognition;
    recognition.start();
  };

  const stopListening = () => {
    if ((window as any).recognition) {
      (window as any).recognition.stop();
    }
    setState(s => ({ ...s, isListening: false }));
  };

  return {
    ...state,
    startListening,
    stopListening,
    speak
  };
}
