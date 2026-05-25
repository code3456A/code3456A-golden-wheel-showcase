import { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, X, Sparkles, Bot, User, RefreshCw, Paperclip, File as FileIcon } from "lucide-react";
import { cars, type Car, type Category } from "@/data/cars";

interface MessageAttachment {
  name: string;
  type: string;
  size: string;
  url: string;
}

interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: Date;
  files?: MessageAttachment[];
}

export function ChatSupport() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "ai",
      text: "Bem-vindo ao *LuxuryCars Concierge Privado*.\n\nSou o seu assessor pessoal de aquisições e inteligência artificial da nossa coleção privada. Fui meticulosamente programado para conhecer em absoluto detalhe cada uma das extraordinárias obras de arte automóvel expostas na nossa galeria.\n\nSeja para comparar a engenharia de pista de dois hipercarros, filtrar modelos adequados ao seu perfil de investimento, analisar telemetria de performance ou preparar a sua admissão exclusiva num dos nossos showrooms em Lisboa, Porto, Portimão, Mónaco ou Dubai, estou inteiramente à sua disposição.\n\nComo posso servi-lo hoje, Excelentíssimo?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  
  // File upload states
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<MessageAttachment[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const lastMentionedCarRef = useRef<Car | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (!isOpen && messages.length > 1) {
      setHasNewMessage(true);
    }
  }, [messages, isOpen]);

  const handleOpenToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setHasNewMessage(false);
    }
  };

  const quickPrompts = [
    { label: "Mais rápido ⚡", query: "Qual é o carro mais rápido da coleção?" },
    { label: "Comparar Modelos ⚖️", query: "Compara o Bugatti Chiron com o Koenigsegg Jesko" },
    { label: "Carros até 150k 💰", query: "Têm carros até 150.000 euros?" },
    { label: "Agendar Showroom 📅", query: "Como faço para marcar uma visita privada?" },
  ];

  // Helper to extract numeric price
  const getNumericPrice = (car: Car): number => {
    return parseInt(car.price.replace(/[^0-9]/g, "")) || 0;
  };

  // Trigger hidden file input
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Handle files selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const filesArray = Array.from(e.target.files);

    const newPreviews = filesArray.map(file => {
      const sizeStr = file.size > 1024 * 1024 
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` 
        : `${(file.size / 1024).toFixed(0)} KB`;
      
      return {
        name: file.name,
        type: file.type,
        size: sizeStr,
        url: file.type.startsWith("image/") ? URL.createObjectURL(file) : "",
      };
    });

    setSelectedFiles(prev => [...prev, ...filesArray]);
    setPreviews(prev => [...prev, ...newPreviews]);
  };

  // Remove attached file
  const handleRemoveFile = (idx: number) => {
    if (previews[idx].url && previews[idx].type.startsWith("image/")) {
      URL.revokeObjectURL(previews[idx].url);
    }
    setSelectedFiles(prev => prev.filter((_, i) => i !== idx));
    setPreviews(prev => prev.filter((_, i) => i !== idx));
  };

  // AI Response Generator
  const generateAIResponse = (userText: string): string => {
    const text = userText.toLowerCase().trim();

    // 1. GREETINGS
    if (/^(olá|oi|boas|bom dia|boa tarde|boa noite|alô|hello|hi|salut|como estas|como está)/i.test(text)) {
      return "Olá! É um privilégio interagir consigo.\n\nComo concierge da LuxuryCars, estou preparado para lhe dar todos os detalhes técnicos, valores ou ajudar no agendamento do showroom. Gostaria de explorar alguma categoria específica (Hypercars, Supercars, JDM, Muscle, Electric) ou tem algum modelo em mente?";
    }

    // 2. CLEAR HISTORY / RESET
    if (text === "reiniciar" || text === "limpar" || text === "reset") {
      lastMentionedCarRef.current = null;
      setMessages([
        {
          id: "welcome",
          sender: "ai",
          text: "Histórico limpo. O LuxuryCars Concierge está pronto para uma nova consulta. Como o posso ajudar?",
          timestamp: new Date(),
        }
      ]);
      return "";
    }

    // 3. CAPABILITIES / HELP
    if (text.includes("ajuda") || text.includes("o que fazes") || text.includes("comandos") || text.includes("saber fazer") || text.includes("funções") || text.includes("anexar") || text.includes("anexo") || text.includes("enviar")) {
      return "Estou programado com recursos avançados de assistência:\n\n" +
             "• **Envio de Ficheiros**: Pode usar o botão de clipe (📎) no rodapé do chat para me enviar imagens do seu carro (para processos de retoma/avaliação) ou ficheiros PDF/texto (comprovativos, relatórios).\n" +
             "• **Pesquisa Direta**: Pergunte por qualquer modelo (ex: *'Diz-me as especificações do Nevera'*).\n" +
             "• **Comparação de Modelos**: Peça para comparar dois carros (ex: *'Compara o Ferrari com o Lamborghini Revuelto'*).\n" +
             "• **Filtragem de Orçamento**: Descubra modelos dentro do seu orçamento (ex: *'Que carros têm até 150 mil euros?'*).\n" +
             "• **Pesquisa por Origem**: Descubra modelos de certos países (ex: *'Quais os carros japoneses?'*).\n" +
             "• **Agendamento**: Agende a sua visita aos showrooms de Lisboa, Porto, Portimão, Mónaco ou Dubai.\n\n" +
             "Como posso ser útil neste momento?";
    }

    // 4. COMPARISON ENGINE
    const comparisonKeywords = ["compara", "comparação", "comparar", "diferença entre", "vs", "versus", "diferenças"];
    const isComparisonQuery = comparisonKeywords.some(kw => text.includes(kw));
    
    if (isComparisonQuery) {
      const matchedCars: Car[] = [];
      cars.forEach(car => {
        const carWords = car.name.toLowerCase().split(" ");
        const isMentioned = carWords.some(word => word.length > 2 && text.includes(word)) || text.includes(car.slug.replace("-", " "));
        if (isMentioned && !matchedCars.some(c => c.slug === car.slug)) {
          matchedCars.push(car);
        }
      });

      if (matchedCars.length >= 2) {
        const c1 = matchedCars[0];
        const c2 = matchedCars[1];
        lastMentionedCarRef.current = c1;

        return `Com todo o gosto. Preparei uma comparação técnica direta entre o **${c1.name}** e o **${c2.name}**:\n\n` +
               `| Característica | ${c1.name} | ${c2.name} |\n` +
               `| --- | --- | --- |\n` +
               `| **Origem** | ${c1.origin} | ${c2.origin} |\n` +
               `| **Categoria** | ${c1.category} | ${c2.category} |\n` +
               `| **Motorização** | ${c1.engine} | ${c2.engine} |\n` +
               `| **Potência** | ${c1.power} | ${c2.power} |\n` +
               `| **Velocidade Máx.** | ${c1.topSpeed} | ${c2.topSpeed} |\n` +
               `| **Aceleração (0-100)** | ${c1.acceleration} | ${c2.acceleration} |\n` +
               `| **Transmissão** | ${c1.transmission} | ${c2.transmission} |\n` +
               `| **Preço Estimado** | ${c1.price} | ${c2.price} |\n\n` +
               `*Concierge Insight:* O **${c1.name}** destaca-se por ser ${c1.specs[1].toLowerCase()}, enquanto o **${c2.name}** orgulha-se de ter ${c2.specs[2].toLowerCase()}.\n\nQual destas filosofias de design se adequa melhor à sua coleção privada?`;
      } else if (matchedCars.length === 1 && lastMentionedCarRef.current && matchedCars[0].slug !== lastMentionedCarRef.current.slug) {
        const c1 = lastMentionedCarRef.current;
        const c2 = matchedCars[0];
        return `Com certeza. Comparando o carro de que falávamos (**${c1.name}**) com o recém-mencionado **${c2.name}**:\n\n` +
               `| Característica | ${c1.name} | ${c2.name} |\n` +
               `| --- | --- | --- |\n` +
               `| **Origem** | ${c1.origin} | ${c2.origin} |\n` +
               `| **Categoria** | ${c1.category} | ${c2.category} |\n` +
               `| **Potência** | ${c1.power} | ${c2.power} |\n` +
               `| **Velocidade Máx.** | ${c1.topSpeed} | ${c2.topSpeed} |\n` +
               `| **Aceleração (0-100)** | ${c1.acceleration} | ${c2.acceleration} |\n` +
               `| **Preço** | ${c1.price} | ${c2.price} |\n\n` +
               `Gostaria de agendar uma chamada com um dos nossos consultores para discutir estas diferenças em detalhe?`;
      } else {
        return "Para efetuar uma comparação direta, por favor indique o nome de dois modelos específicos da nossa coleção (por exemplo: *'Compara o Bugatti Chiron com o Koenigsegg Jesko'* ou *'Tesla Plaid vs Porsche Taycan'*).";
      }
    }

    // 5. BUDGET FILTERING
    const priceKeywords = ["preço", "preco", "preços", "custo", "custa", "valor", "valores", "orçamento", "orcamento", "barato", "caro", "acessível", "comprar"];
    const isPriceQuery = priceKeywords.some(kw => text.includes(kw));

    if (isPriceQuery) {
      if (text.includes("barato") || text.includes("económico") || text.includes("acessível") || text.includes("mais em conta") || text.includes("menor valor")) {
        const sortedCars = [...cars].sort((a, b) => getNumericPrice(a) - getNumericPrice(b));
        const cheapest = sortedCars.slice(0, 3);
        return `As nossas propostas mais acessíveis na coleção privada (sem comprometer a performance de elite) são:\n\n` +
               cheapest.map((c, i) => `${i + 1}. **${c.name}** (${c.category}) — **${c.price}**\n` + 
               `   * Destaque: ${c.specs.join(", ")}.\n`).join("\n") +
               `\nQual destes clássicos JDM ou desportivos gostaria de explorar primeiro?`;
      }

      if (text.includes("caro") || text.includes("exclusivo") || text.includes("valioso") || text.includes("maior valor") || text.includes("topo")) {
        const sortedCars = [...cars].sort((a, b) => getNumericPrice(b) - getNumericPrice(a));
        const premium = sortedCars.slice(0, 3);
        return `As jóias mais raras e exclusivas da coroa LuxuryCars são:\n\n` +
               premium.map((c, i) => `${i + 1}. **${c.name}** (${c.category}) — **${c.price}**\n` + 
               `   * Detalhes: ${c.power}, ${c.engine}, atingindo ${c.topSpeed}.\n`).join("\n") +
               `\nEstes hipercarros de produção altamente limitada representam o auge do investimento e da engenharia automóvel.`;
      }

      const numberMatches = text.match(/\d+[\d.,\s]*(?:mil|milhões|m|k|euros|€)?/g);
      if (numberMatches) {
        let budgetLimit = 0;
        const numberStr = numberMatches[0].replace(/\s/g, "");

        if (numberStr.includes("milhão") || numberStr.includes("milhoes") || numberStr.includes("m") && !numberStr.includes("mil")) {
          const num = parseFloat(numberStr.replace(/[^0-9.]/g, "")) || 0;
          budgetLimit = num * 1000000;
        } else if (numberStr.includes("mil") || numberStr.includes("k")) {
          const num = parseFloat(numberStr.replace(/[^0-9.]/g, "")) || 0;
          budgetLimit = num * 1000;
        } else {
          const cleanNum = parseInt(numberStr.replace(/[^0-9]/g, "")) || 0;
          if (cleanNum < 5000) {
            budgetLimit = cleanNum * 1000;
          } else {
            budgetLimit = cleanNum;
          }
        }

        if (budgetLimit > 0) {
          const matchingCars = cars.filter(c => getNumericPrice(c) <= budgetLimit)
                                    .sort((a, b) => getNumericPrice(b) - getNumericPrice(a));
          
          if (matchingCars.length > 0) {
            return `Excelente critério. Encontrei **${matchingCars.length} modelos extraordinários** até **€${budgetLimit.toLocaleString()}** na nossa coleção:\n\n` +
                   matchingCars.slice(0, 5).map((c) => `• **${c.name}** (${c.category}) — **${c.price}**\n` +
                   `  * Especificações: ${c.power}, ${c.engine}, 0-100 km/h em ${c.acceleration}.\n`).join("\n") +
                   (matchingCars.length > 5 ? `\n...e mais ${matchingCars.length - 5} modelos. ` : "\n") +
                   `Gostaria de obter a ficha de investimento detalhada de algum destes veículos?`;
          } else {
            return `A nossa coleção privada é composta por automóveis altamente exclusivos. Atualmente, o nosso modelo com valor de entrada é o **Mazda RX-7 a €60.000**. Não temos nenhum modelo disponível por valores inferiores a €${budgetLimit.toLocaleString()}.\n\nGostaria de ver as opções mais próximas deste orçamento?`;
          }
        }
      }
    }

    // 6. DETAILED SPECIFIC CAR SEARCH
    let bestMatchCar: Car | null = null;
    let maxScore = 0;

    cars.forEach(car => {
      let score = 0;
      const lowerName = car.name.toLowerCase();
      const lowerBrand = car.name.split(" ")[0].toLowerCase();
      const lowerModel = car.name.replace(car.name.split(" ")[0], "").trim().toLowerCase();
      const lowerSlug = car.slug.replace("-", " ");

      if (text.includes(lowerName)) {
        score += 15;
      } else if (text.includes(lowerSlug)) {
        score += 12;
      } else if (text.includes(lowerBrand) && lowerBrand.length > 2) {
        score += 6;
        if (text.includes(lowerModel) && lowerModel.length > 1) {
          score += 8;
        }
      } else if (text.includes(lowerModel) && lowerModel.length > 2) {
        score += 7;
      }

      if (score > maxScore) {
        maxScore = score;
        bestMatchCar = car;
      }
    });

    if (bestMatchCar && maxScore >= 5) {
      const car = bestMatchCar as Car;
      lastMentionedCarRef.current = car;

      return `O **${car.name}** é uma das peças mais cobiçadas do nosso showroom. Permita-me partilhar os seus dados técnicos:\n\n` +
             `| Detalhe Técnico | Ficha de Colecionador |\n` +
             `| --- | --- |\n` +
             `| **Modelo** | ${car.name} |\n` +
             `| **País de Origem** | ${car.origin} |\n` +
             `| **Categoria** | ${car.category} |\n` +
             `| **Motor** | ${car.engine} |\n` +
             `| **Potência** | ${car.power} |\n` +
             `| **Velocidade de Ponta** | ${car.topSpeed} |\n` +
             `| **Aceleração (0-100)** | ${car.acceleration} |\n` +
             `| **Caixa de Velocidades** | ${car.transmission} |\n` +
             `| **Ano de Fabrico** | ${car.year} |\n` +
             `| **Valor de Aquisição** | ${car.price} |\n\n` +
             `*Nota do Especialista:* "${car.description}"\n\n` +
             `*Destaques:* ${car.specs.join(" · ")}.\n\n` +
             `Gostaria de solicitar uma gravação de áudio do arranque do motor, fotos adicionais em alta resolução do interior ou avançar para a reserva deste modelo?`;
    }

    // 7. CONTEXTUAL FOLLOW-UPS
    const hasContextWord = text.includes("dele") || text.includes("deste") || text.includes("desse") || text.includes("referido") || text.includes("da máquina");
    if (hasContextWord && lastMentionedCarRef.current) {
      const car = lastMentionedCarRef.current;
      
      if (text.includes("preço") || text.includes("preco") || text.includes("custa") || text.includes("valor")) {
        return `O valor do **${car.name}** na nossa coleção privada está fixado em **${car.price}**, incluindo documentação completa de histórico e manutenção de fábrica.`;
      }
      if (text.includes("velocidade") || text.includes("rapido") || text.includes("rápido") || text.includes("km/h") || text.includes("anda")) {
        return `O **${car.name}** atinge uma velocidade máxima homologada de **${car.topSpeed}** e acelera dos 0 aos 100 km/h em apenas **${car.acceleration}**.`;
      }
      if (text.includes("origem") || text.includes("onde") || text.includes("país") || text.includes("pais") || text.includes("fabricado")) {
        return `Este exemplar do **${car.name}** foi meticulosamente construído na **${car.origin}**.`;
      }
      if (text.includes("motor") || text.includes("cavalos") || text.includes("potência") || text.includes("potencia") || text.includes("cv")) {
        return `O **${car.name}** vem equipado com um propulsor **${car.engine}** debitando **${car.power}** de potência pura.`;
      }
      
      return `Como falávamos do **${car.name}**, posso indicar-lhe a sua ficha técnica, comparar com outro veículo ou marcar um teste estático no showroom. O que prefere?`;
    }

    // 8. ORIGIN SEARCH
    const countriesMap: Record<string, string[]> = {
      "japão": ["japão", "japao", "japones", "japonês", "jdm"],
      "itália": ["itália", "italia", "italiano", "italianos"],
      "alemanha": ["alemanha", "alemão", "alemao", "alemães", "alemaes"],
      "eua": ["eua", "e.u.a", "americano", "americanos", "estados unidos", "muscle"],
      "frança": ["frança", "franca", "francês", "frances"],
      "suécia": ["suécia", "suecia", "sueco", "suecos"],
      "croácia": ["croácia", "croacia", "croata"],
      "reino unido": ["reino unido", "inglaterra", "inglês", "ingles", "mclaren"]
    };

    let matchedOrigin: string | null = null;
    for (const [country, keywords] of Object.entries(countriesMap)) {
      if (keywords.some(kw => text.includes(kw))) {
        matchedOrigin = country;
        break;
      }
    }

    if (matchedOrigin) {
      const originCars = cars.filter(c => c.origin.toLowerCase() === matchedOrigin || 
                                           (matchedOrigin === "eua" && c.origin === "EUA"));
      if (originCars.length > 0) {
        return `Orgulhamo-nos de expor **${originCars.length} máquinas exclusivas** de origem **${matchedOrigin.toUpperCase()}**:\n\n` +
               originCars.map(c => `• **${c.name}** (${c.category}) — ${c.price} (Motor ${c.engine})\n`).join("") +
               `\nA engenharia deste país é lendária. Deseja obter mais dados sobre algum destes modelos em específico?`;
      }
    }

    // 9. HIGH PERFORMANCE
    if (text.includes("rápido") || text.includes("velocidade") || text.includes("acelera") || text.includes("rapido") || text.includes("binário") || text.includes("cavalos") || text.includes("potência") || text.includes("potencia")) {
      const fastCars = [...cars].sort((a, b) => parseInt(b.topSpeed.replace(/[^0-9]/g, "")) - parseInt(a.topSpeed.replace(/[^0-9]/g, "")));
      const top = fastCars[0];
      const second = fastCars[1];
      const accel = [...cars].sort((a, b) => parseFloat(a.acceleration.replace(/[^0-9.]/g, "")) - parseFloat(b.acceleration.replace(/[^0-9.]/g, "")))[0];

      return `Eis os marcos de performance extrema da nossa frota privada:\n\n` +
             `• **Velocidade de Ponta Máxima**: O **${top.name}** lidera a coleção atingindo extraordinários **${top.topSpeed}**, seguido de perto pelo **${second.name}** a **${second.topSpeed}**.\n` +
             `• **Aceleração 0-100 km/h mais Brutal**: O elétrico **${accel.name}** pulveriza marcas fazendo a arrancada em meros **${accel.acceleration}**.\n` +
             `• **Cavalagem Extrema**: O **${accel.name}** entrega também a maior potência bruta com **${accel.power}**, acompanhado pelo **${top.name}** com **${top.power}**.\n\n` +
             `Gostaria de ver os dados específicos de aerodinâmica ou telemetria de pista de algum destes modelos?`;
    }

    // 10. CATEGORY SEARCH
    const categoriesMap: Record<Category, string[]> = {
      "Hypercars": ["hypercar", "hipercarro", "hipercarros", "hypercars"],
      "Supercars": ["supercar", "supercarro", "supercarros", "supercars"],
      "JDM": ["jdm", "japonês", "japão", "japao", "importado", "tuning"],
      "Muscle": ["muscle", "v8", "americano", "mustang", "hellcat", "charger"],
      "Electric": ["elétrico", "eletrico", "elétricos", "eletricos", "bateria", "tesla", "taycan"]
    };

    let matchedCategory: Category | null = null;
    for (const [cat, keywords] of Object.entries(categoriesMap)) {
      if (keywords.some(kw => text.includes(kw))) {
        matchedCategory = cat;
        break;
      }
    }

    if (matchedCategory) {
      const catCars = cars.filter(c => c.category === matchedCategory);
      return `A categoria **${matchedCategory}** é composta por **${catCars.length} viaturas de topo**:\n\n` +
             catCars.map(c => `• **${c.name}** (${c.power} · 0-100 em ${c.acceleration}) — **${c.price}**\n`).join("") +
             `\nGostaria de filtrar estes veículos por preço ou comparar dois deles diretamente?`;
    }

    // 11. HOW-TO BOOK A VISIT (INSTRUCTIONS)
    if (text.includes("como") && (text.includes("visita") || text.includes("agendar") || text.includes("marcar"))) {
      return "Para agendar uma visita exclusiva a uma das nossas galerias privadas, dispõe de 3 métodos rápidos:\n\n" +
             "1. **Agendamento por Email Directo**:\n" +
             "   Envie a sua proposta de data, hora e o modelo de interesse para o endereço **concierge@luxurycars.com**. O seu gestor de conta responderá em menos de 2 horas úteis.\n\n" +
             "2. **Botão de Acesso Rápido na Secção Hero**:\n" +
             "   No topo desta página, logo abaixo da nossa apresentação, clique no botão dourado **'Marcar Visita'**. Este botão irá levá-lo diretamente à secção de contacto privado no rodapé do site.\n\n" +
             "3. **Ficha de Reserva Individual de Veículo**:\n" +
             "   Se estiver interessado num carro específico, aceda à página de detalhes do veículo (clicando em *'Detalhes'* no cartão do carro) e, no painel lateral direito da *Ficha Técnica*, clique no botão dourado **'Solicitar Reserva'** para abrir uma janela de email pré-preenchida.\n\n" +
             "Lembramos que o acesso a qualquer um dos showrooms (Lisboa, Porto, Portimão, Mónaco ou Dubai) é efetuado estritamente sob convite e marcação prévia. Gostaria que eu preparasse os detalhes do seu pedido?";
    }

    // 12. HOW-TO FIND INFORMATION/DETAILS (INSTRUCTIONS)
    if (text.includes("como") && (text.includes("informação") || text.includes("informacao") || text.includes("informações") || text.includes("detalhes") || text.includes("saber mais") || text.includes("encontrar") || text.includes("ficha") || text.includes("carro") || text.includes("carros"))) {
      return "Para consultar em pormenor a ficha de colecionador e dados mecânicos de qualquer máquina da nossa coleção, siga estes passos simples:\n\n" +
             "1. **Navegue até à Coleção**:\n" +
             "   Na página inicial, desça até à secção **'A Coleção'** (pode usar o botão *'Explorar Coleção'* no topo para saltar diretamente para lá).\n\n" +
             "2. **Filtre por Categoria**:\n" +
             "   Utilize os botões de filtro dourados (*Hypercars*, *Supercars*, *JDM*, *Muscle*, *Electric*) para focar a pesquisa no segmento pretendido.\n\n" +
             "3. **Aceda à Ficha de Detalhe**:\n" +
             "   No cartão do automóvel que lhe interessa, clique no link dourado **'Detalhes →'** (no canto inferior direito do cartão). Isto abrirá a página exclusiva do modelo.\n\n" +
             "4. **Explore a Ficha Técnica e Estética**:\n" +
             "   Na página do veículo, terá acesso à secção **'A Máquina'** (histórico e filosofia), **'Destaques'** (acabamentos e raridade) e, no painel lateral direito, à **'Ficha Técnica'** completa (motorização, cavalos de potência, velocidade máxima, aceleração 0-100 km/h e preço).\n\n" +
             "Se preferir, pode também perguntar-me diretamente por qualquer modelo aqui no chat (ex: *'Ficha técnica do Bugatti Chiron'*) e eu apresentar-lhe-ei os dados imediatamente!";
    }

    // 13. SHOWROOM & BOOKING GENERAL
    if (text.includes("visita") || text.includes("agendar") || text.includes("marcar") || text.includes("showroom") || text.includes("contacto") || text.includes("morada") || text.includes("onde") || text.includes("telefone") || text.includes("email")) {
      return "A LuxuryCars opera sob a máxima discrição e exclusividade.\n\n" +
             "• **Showrooms Físicos**: Dispomos de galerias privadas em **Lisboa (Parque das Nações), Porto (Foz), Portimão (Marina), Mónaco (Monte Carlo) e Dubai (Marina)**.\n" +
             "• **Política de Admissão**: Visitas apenas permitidas mediante marcação e verificação prévia de perfil de colecionador.\n" +
             "• **Como Agendar**: Envie a sua proposta de data e o modelo de interesse para **concierge@luxurycars.com** ou contacte o nosso Concierge 24/7 de forma direta. Alternativamente, utilize o botão 'Marcar Visita' na barra superior do nosso site.\n\n" +
             "Deseja que prepare uma minuta de contacto com os seus dados de interesse?";
    }

    // 14. GENERAL FALLBACK
    return "Compreendo a sua questão, no entanto, para lhe dar a resposta mais precisa, preciso de um pouco mais de detalhe.\n\n" +
           "Como seu Concierge IA, posso:\n" +
           "1. **Comparar carros** (ex: *'Compara o Nissan GT-R com o Toyota Supra'*)\n" +
           "2. **Procurar por preço** (ex: *'Carros abaixo de 200 mil euros'*)\n" +
           "3. **Dar detalhes de um carro** (ex: *'Ficha técnica do Pagani Huayra'*)\n" +
           "4. **Falar sobre o Showroom** (ex: *'Como posso marcar uma visita?'*)\n\n" +
           "Que tema prefere explorar de seguida?";
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputValue;
    const hasFiles = previews.length > 0;
    
    if (!text.trim() && !hasFiles) return;

    const userMsg: Message = {
      id: Math.random().toString(),
      sender: "user",
      text,
      timestamp: new Date(),
      files: hasFiles ? [...previews] : undefined,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue("");
    
    // Clear selection queues
    setSelectedFiles([]);
    setPreviews([]);
    
    setIsTyping(true);

    setTimeout(() => {
      let responseText = "";
      
      // Smart detection for file uploads
      if (hasFiles && userMsg.files) {
        const fileNames = userMsg.files.map(f => f.name).join(", ");
        const hasImage = userMsg.files.some(f => f.type.startsWith("image/"));
        
        if (hasImage) {
          responseText = `Recebi a sua imagem do veículo. É um exemplar magnífico!\n\nO nosso departamento de **avaliações estéticas e técnicas da LuxuryCars** já foi notificado. Iremos analisar em pormenor a integridade da carroçaria, a especificação das jantes, o estado dos interiores e a autenticidade dos pormenores exibidos na foto.\n\nPretende que um dos nossos especialistas em clássicos ou hipercarros o contacte diretamente para avançar com uma estimativa de valor de mercado para a sua retoma ou aquisição?`;
        } else {
          responseText = `Confirmo a receção dos seus ficheiros de suporte (**${fileNames}**).\n\nO nosso gabinete jurídico e financeiro irá verificar a documentação anexada (como relatórios de histórico, faturas oficiais de fábrica ou registos de propriedade) para agilizar o processo de due-diligence e aquisição privada.\n\nUm gestor de conta dedicado irá contactá-lo num prazo máximo de **2 horas úteis** para dar seguimento ao seu processo.`;
        }
      } else {
        responseText = generateAIResponse(text);
      }

      if (responseText) {
        const aiMsg: Message = {
          id: Math.random().toString(),
          sender: "ai",
          text: responseText,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMsg]);
      }
      setIsTyping(false);
    }, 1200);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleClearHistory = () => {
    lastMentionedCarRef.current = null;
    setMessages([
      {
        id: "welcome",
        sender: "ai",
        text: "Bem-vindo ao *LuxuryCars Concierge Privado*.\n\nSou o seu assessor pessoal de aquisições e inteligência artificial da nossa coleção privada. Fui meticulosamente programado para conhecer em absoluto detalhe cada uma das extraordinárias obras de arte automóvel expostas na nossa galeria.\n\nSeja para comparar a engenharia de pista de dois hipercarros, filtrar modelos adequados ao seu perfil de investimento, analisar telemetria de performance ou preparar a sua admissão exclusiva num dos nossos showrooms em Lisboa, Porto, Portimão, Mónaco ou Dubai, estou inteiramente à sua disposição.\n\nComo posso servi-lo hoje, Excelentíssimo?",
        timestamp: new Date(),
      },
    ]);
  };

  // Clean-up object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      previews.forEach(p => {
        if (p.url && p.type.startsWith("image/")) {
          URL.revokeObjectURL(p.url);
        }
      });
    };
  }, []);

  // Advanced Formatter supporting markdown tables, bullet points, bold and italics
  const formatMessageText = (text: string) => {
    if (text.includes("|")) {
      const lines = text.split("\n");
      const tableLines = lines.filter(line => line.trim().startsWith("|") && line.trim().endsWith("|"));
      const nonTableTextBefore = lines.slice(0, lines.indexOf(tableLines[0])).join("\n");
      const nonTableTextAfter = lines.slice(lines.indexOf(tableLines[tableLines.length - 1]) + 1).join("\n");

      if (tableLines.length > 0) {
        const parsedRows = tableLines.map(line => {
          return line.split("|").slice(1, -1).map(cell => cell.trim());
        });
        
        const hasDivider = parsedRows[1] && parsedRows[1].every(cell => cell.startsWith("-") || cell.startsWith(" :") || cell.startsWith(":-"));
        const headerRow = parsedRows[0];
        const bodyRows = hasDivider ? parsedRows.slice(2) : parsedRows.slice(1);
        
        return (
          <div className="space-y-2">
            {nonTableTextBefore && <div>{formatMessageText(nonTableTextBefore)}</div>}
            <div className="my-3 overflow-x-auto border border-gold-soft/30 rounded shadow-inner">
              <table className="w-full text-[10px] md:text-[11px] text-left border-collapse bg-background/60">
                <thead>
                  <tr className="border-b border-gold-soft/40 bg-secondary/70">
                    {headerRow.map((cell, idx) => (
                      <th key={idx} className="p-2 font-bold text-gold font-sans tracking-wide uppercase text-[9px]">{formatMessageText(cell)}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {bodyRows.map((row, rIdx) => (
                    <tr key={rIdx} className="border-b border-gold-soft/10 hover:bg-secondary/40 transition-colors">
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="p-2 text-foreground font-light">{formatMessageText(cell)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {nonTableTextAfter && <div>{formatMessageText(nonTableTextAfter)}</div>}
          </div>
        );
      }
    }

    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={index} className="font-semibold text-gold-bright">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith("*") && part.endsWith("*")) {
        return <em key={index} className="italic text-muted-foreground">{part.slice(1, -1)}</em>;
      }
      
      if (part.includes("\n")) {
        return part.split("\n").map((line, lIdx) => (
          <span key={`${index}-${lIdx}`}>
            {line}
            {lIdx < part.split("\n").length - 1 && <br />}
          </span>
        ));
      }
      return part;
    });
  };

  return (
    <>
      {/* FLOATING ACTION BUBBLE */}
      <button
        onClick={handleOpenToggle}
        aria-label="Abrir Chat de Suporte IA"
        className={`fixed bottom-6 right-6 z-50 flex items-center justify-center rounded-full w-14 h-14 md:w-16 md:h-16 border border-gold-soft bg-card/90 backdrop-blur-md text-gold hover:text-gold-bright shadow-lg hover:shadow-gold transition-all duration-300 group ${
          isOpen ? "rotate-90 scale-95" : "hover:scale-110 active:scale-95"
        }`}
        style={{
          boxShadow: hasNewMessage 
            ? "0 0 22px oklch(0.78 0.13 80 / 0.6)" 
            : "0 10px 30px -10px oklch(0 0 0 / 0.5)",
        }}
      >
        {isOpen ? (
          <X className="w-6 h-6 md:w-7 md:h-7" />
        ) : (
          <div className="relative">
            <MessageSquare className="w-6 h-6 md:w-7 md:h-7" />
            {hasNewMessage && (
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-gold"></span>
              </span>
            )}
            {!hasNewMessage && (
              <span className="absolute -bottom-1 -right-1 flex h-2 w-2 rounded-full bg-gold/40 animate-pulse"></span>
            )}
          </div>
        )}
      </button>

      {/* CHAT WINDOW */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-[420px] max-w-[calc(100vw-3rem)] h-[580px] max-h-[calc(100vh-8rem)] flex flex-col border border-gold-soft rounded-lg bg-card/95 backdrop-blur-md shadow-2xl transition-all duration-300 origin-bottom-right ease-out ${
          isOpen 
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto" 
            : "opacity-0 scale-95 translate-y-4 pointer-events-none"
        }`}
        style={{
          boxShadow: "0 25px 60px -15px oklch(0.78 0.13 80 / 0.2), 0 10px 30px -10px oklch(0 0 0 / 0.8)",
        }}
      >
        {/* HEADER */}
        <header className="flex items-center justify-between p-4 border-b border-gold-soft/50 bg-background/40">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-full border border-gold-soft bg-card">
              <Bot className="w-5 h-5 text-gold" />
              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 border border-card animate-pulse"></span>
            </div>
            <div>
              <h2 className="font-display text-xs md:text-sm tracking-widest text-gold-gradient font-bold flex items-center gap-1.5">
                LuxuryCars Concierge
                <Sparkles className="w-3.5 h-3.5 text-gold shimmer" />
              </h2>
              <p className="text-[0.6rem] tracking-wider text-muted-foreground uppercase flex items-center gap-1">
                <span className="inline-block w-1 h-1 rounded-full bg-green-500"></span>
                Suporte de IA Ativo
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleClearHistory}
              title="Reiniciar Conversa"
              className="p-1.5 rounded-md text-muted-foreground hover:text-gold hover:bg-secondary/40 transition-all"
              aria-label="Reiniciar"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={handleOpenToggle}
              className="p-1.5 rounded-md text-muted-foreground hover:text-gold hover:bg-secondary/40 transition-all"
              aria-label="Fechar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* MESSAGES BODY */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gold-soft scrollbar-track-transparent">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-2 max-w-[90%] ${
                msg.sender === "user" ? "ml-auto flex-row-reverse" : ""
              }`}
            >
              {/* Avatar Icon */}
              <div
                className={`flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full border text-[0.6rem] ${
                  msg.sender === "user"
                    ? "border-gold-soft bg-gold text-primary-foreground"
                    : "border-gold-soft/40 bg-secondary text-gold"
                }`}
              >
                {msg.sender === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
              </div>

              {/* Text Bubble */}
              <div
                className={`p-3 rounded-lg text-xs leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-gold text-primary-foreground font-medium rounded-tr-none shadow-md shadow-gold/15"
                    : "bg-secondary/60 border border-gold-soft/20 text-foreground rounded-tl-none"
                }`}
              >
                <div className="whitespace-pre-wrap">
                  {formatMessageText(msg.text)}
                </div>

                {/* Render Attached Files inside Message Bubble */}
                {msg.files && msg.files.length > 0 && (
                  <div className="mt-3 space-y-2 border-t border-gold-soft/10 pt-2">
                    {msg.files.map((file, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 p-2 bg-background/50 border border-gold-soft/20 rounded text-[11px] max-w-full overflow-hidden">
                        {file.type.startsWith("image/") ? (
                          <div className="flex flex-col gap-1 w-full">
                            <a href={file.url} target="_blank" rel="noopener noreferrer" className="relative block overflow-hidden rounded border border-gold-soft/20 aspect-video bg-black/20 group hover:scale-105 transition-transform max-w-[240px]">
                              <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
                            </a>
                            <span className="text-[9px] text-muted-foreground truncate">{file.name} ({file.size})</span>
                          </div>
                        ) : (
                          <>
                            <div className="w-8 h-8 flex items-center justify-center bg-secondary text-gold rounded flex-shrink-0">
                              <FileIcon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="truncate font-medium text-foreground">{file.name}</p>
                              <p className="text-[9px] text-muted-foreground">{file.size}</p>
                            </div>
                            <a 
                              href={file.url} 
                              download={file.name}
                              className="px-2.5 py-1 bg-gold hover:bg-gold-bright text-primary-foreground font-semibold rounded text-[9px] transition-colors flex-shrink-0"
                            >
                              Baixar
                            </a>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <div
                  className={`text-[0.55rem] mt-1.5 text-right ${
                    msg.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground/55"
                  }`}
                >
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-start gap-2 max-w-[80%]">
              <div className="flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-full border border-gold-soft/40 bg-secondary text-gold">
                <Bot className="w-3.5 h-3.5" />
              </div>
              <div className="p-3 bg-secondary/50 border border-gold-soft/20 rounded-lg rounded-tl-none flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold/80 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-1.5 h-1.5 rounded-full bg-gold/80 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-1.5 h-1.5 rounded-full bg-gold/80 animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* QUICK SUGGESTIONS */}
        {messages.length === 1 && !isTyping && (
          <div className="px-4 py-3 border-t border-gold-soft/20 bg-background/20">
            <p className="text-[0.6rem] uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-gold" /> Sugestões Inteligentes:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {quickPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(p.query)}
                  className="px-3 py-1.5 text-[0.65rem] border border-gold-soft/30 hover:border-gold bg-secondary/30 hover:bg-secondary/60 text-muted-foreground hover:text-gold rounded-full transition-all cursor-pointer text-left"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* INPUT CONTAINER */}
        <footer className="p-3 border-t border-gold-soft/50 bg-background/40 flex flex-col gap-2">
          {/* Selected Files Previews */}
          {previews.length > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-gold-soft/15 max-h-[80px]">
              {previews.map((file, idx) => (
                <div key={idx} className="relative flex items-center gap-2 p-1.5 bg-background border border-gold-soft/30 rounded max-w-[150px] flex-shrink-0 text-[10px]">
                  {file.type.startsWith("image/") ? (
                    <img src={file.url} alt="" className="w-8 h-8 object-cover rounded" />
                  ) : (
                    <div className="w-8 h-8 flex items-center justify-center bg-secondary text-gold rounded flex-shrink-0">
                      <FileIcon className="w-4 h-4" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0 text-[9px]">
                    <p className="truncate font-medium text-foreground">{file.name}</p>
                    <p className="text-[8px] text-muted-foreground">{file.size}</p>
                  </div>
                  <button 
                    onClick={() => handleRemoveFile(idx)}
                    className="absolute -top-1.5 -right-1.5 p-0.5 bg-red-950/80 border border-red-500/30 text-red-400 rounded-full hover:bg-red-950 transition-all cursor-pointer"
                  >
                    <X className="w-2.5 h-2.5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Controls Row */}
          <div className="flex items-center gap-2">
            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple
              accept="image/*,application/pdf,text/*,application/zip"
              className="hidden"
            />
            {/* Attachment Button */}
            <button
              onClick={triggerFileInput}
              title="Anexar Imagem ou Ficheiro"
              className="p-2.5 rounded border border-gold-soft/40 hover:border-gold hover:text-gold text-muted-foreground bg-secondary/50 hover:bg-secondary/80 transition-all cursor-pointer"
            >
              <Paperclip className="w-3.5 h-3.5" />
            </button>

            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={previews.length > 0 ? "Adicione uma mensagem ou envie..." : "Ex: Compara Chiron e Jesko | Carros até 150k..."}
              className="flex-1 bg-secondary/60 border border-gold-soft/40 focus:border-gold/80 rounded px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground outline-none transition-colors"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={(!inputValue.trim() && previews.length === 0) || isTyping}
              className="p-2.5 rounded bg-gold hover:bg-gold-bright disabled:bg-secondary disabled:text-muted-foreground text-primary-foreground transition-all duration-300"
              aria-label="Enviar mensagem"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </footer>
      </div>
    </>
  );
}
