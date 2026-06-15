/* ==========================================================================
   Barueri Solar - JavaScript Engine
   ========================================================================== */

// 1. Definições do Modelo de Dados
const bairros = [
  { name: "Alphaville", region: "Norte", efficiency: "Excelente", score: 5, desc: "Condomínios horizontais com alto índice de insolação e grandes telhados livres." },
  { name: "Tamboré", region: "Norte", efficiency: "Excelente", score: 5, desc: "Aproveitamento espacial favorável e alta densidade de condomínios fechados." },
  { name: "Bethaville", region: "Central", efficiency: "Ótimo", score: 4, desc: "Zona comercial de expansão vertical rápida com projetos solares integradas." },
  { name: "Centro", region: "Central", efficiency: "Ótimo", score: 4, desc: "Forte incidência comercial com oportunidades de retrofit em coberturas históricas." },
  { name: "Aldeia de Barueri", region: "Leste", efficiency: "Ótimo", score: 4, desc: "Bairro tradicional com insolação generosa em imóveis térreos e sobrados." },
  { name: "Jardim Silveira", region: "Sul", efficiency: "Bom", score: 3, desc: "Área urbana mista; requer análise cuidadosa de sombras vizinhas no período da tarde." },
  { name: "Vila Porto", region: "Leste", efficiency: "Excelente", score: 5, desc: "Eixo promissor com telhados amplos e radiação uniforme sem barreiras físicas." },
  { name: "Parque Imperial", region: "Oeste", efficiency: "Bom", score: 3, desc: "Topografia acidentada com sombras temporárias na encosta, boa para sistemas compactos." },
  { name: "Belval", region: "Oeste", efficiency: "Ótimo", score: 4, desc: "Galpões industriais extensos ideais para arranjos comerciais de alta potência." },
  { name: "Engenho Novo", region: "Sul", efficiency: "Ótimo", score: 4, desc: "Radiação perpendicular constante ao longo de todo o ano; telhados amplos." }
];

const fatos = [
  {
    topic: "LEIS LOCAIS",
    title: "IPTU Verde em Barueri",
    desc: "Iniciativas sustentáveis como instalação de energia solar podem render pontos e descontos fiscais no IPTU municipal, estimulando reformas verdes em condomínios e residências térreas."
  },
  {
    topic: "SMART CITIES",
    title: "Barueri Cidade Inteligente",
    desc: "Nossa cidade está no topo do ranking Connected Smart Cities. A microgeração distribuída de energia limpa contribui diretamente para a infraestrutura de dados e telecomunicações sustentáveis do polo tecnológico nacional."
  },
  {
    topic: "INVESTIMENTO",
    title: "Retorno Garantido (Payback)",
    desc: "O investimento feito em sistemas solares de Barueri se paga em média após 4 anos. Considerando que os painéis têm garantia de rendimento por 25 anos, são mais de 20 anos de pura economia e lucro direto."
  },
  {
    topic: "DISTRIBUIÇÃO",
    title: "Créditos de Energia Enel",
    desc: "Toda a eletricidade solar excedente gerada durante o dia que você não consome é injetada na rede da Enel São Paulo. Isso gera créditos automáticos válidos por até 60 meses para abater contas futuras."
  }
];

const apoiadoresIniciais = [
  { name: "Mariana Souza", profile: "Estudante/Voluntário", location: "Bethaville", text: "Incentivar a sustentabilidade na comunidade jovem de Barueri é crucial! O estimador ajudou a convencer meus pais do valor real das placas.", date: "Há 10 minutos" },
  { name: "Ricardo Almeida", profile: "Empresário", location: "Alphaville", text: "Estamos analisando a inserção de 80kWp no telhado da metalúrgica no Belval. Os números do payback mostram viabilidade econômica fantástica.", date: "Há 2 horas" },
  { name: "Helena Pinheiro", profile: "Residente", location: "Vila Porto", text: "Simulei meus custos com o painel residencial e adorei o resultado ecológico sugerido. Precisamos de cooperativas comunitárias urgentes!", date: "Há 1 dia" }
];

// Gerenciador de Estados
let setorAtivo = "Residencial"; // ou Comercial
let termoPesquisaAtivo = "";
let filtroRegiaoAtiva = "Todos";

// Inicializacao do Canvas DOM
document.addEventListener("DOMContentLoaded", () => {
  // Inicialização de ícones CDN Lucide
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Comportamento ao rolar cabeçalho
  initRolagemNavbar();

  // Comportamento do espião de seções
  initEspiaoNavegacao();

  // Alternador Mobile
  initMenuMobile();

  // Carrossel interactivo
  initAbasFatos();

  // Inicializacao da Calculadora e Gráficos
  initCalculadoraSolar();

  // Carregamento dos Bairros
  initGradeBairros();

  // Configuração do Formulário e Mural
  initContatoEMural();

  // Botão voltar ao topo
  document.getElementById("botao-voltar-ao-topo")?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Atualização do ano de autoria no rodapé
  const spanAnoAtual = document.getElementById("ano-atual");
  if (spanAnoAtual) {
    spanAnoAtual.textContent = new Date().getFullYear();
  }
});

/* ==========================================================================
   EFEITO DE ROLAGEM NO CABEÇALHO
   ========================================================================== */
function initRolagemNavbar() {
  const header = document.getElementById("cabecalho-navegacao");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.classList.add("rolado");
    } else {
      header.classList.remove("rolado");
    }
  });
}

function initEspiaoNavegacao() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".link-navegacao");
  const mobileNavLinks = document.querySelectorAll(".link-navegacao-mobile");

  const spyOptions = {
    root: null,
    threshold: 0.25,
    rootMargin: "-10% 0px -50% 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        
        // Atualizar Desktop
        navLinks.forEach(link => {
          if (link.getAttribute("href")?.substring(1) === id) {
            link.classList.add("ativo");
          } else {
            link.classList.remove("ativo");
          }
        });

        // Atualizar Mobile
        mobileNavLinks.forEach(link => {
          if (link.getAttribute("href")?.substring(1) === id) {
            link.classList.add("ativo");
          } else {
            link.classList.remove("ativo");
          }
        });
      }
    });
  }, spyOptions);

  sections.forEach(section => observer.observe(section));
}

function initMenuMobile() {
  const toggleBtn = document.getElementById("alternador-menu-mobile");
  const menuDrawer = document.getElementById("gaveta-menu-mobile");
  const menuOpenIcon = document.getElementById("icone-menu-abrir");
  const menuCloseIcon = document.getElementById("icone-menu-fechar");
  const mobileLinks = document.querySelectorAll(".link-navegacao-mobile");

  toggleBtn?.addEventListener("click", () => {
    const isHidden = menuDrawer.classList.contains("oculto");
    if (isHidden) {
      menuDrawer.classList.remove("oculto");
      menuOpenIcon.classList.add("oculto");
      menuCloseIcon.classList.remove("oculto");
    } else {
      menuDrawer.classList.add("oculto");
      menuOpenIcon.classList.remove("oculto");
      menuCloseIcon.classList.add("oculto");
    }
  });

  mobileLinks.forEach(link => {
    link.addEventListener("click", () => {
      menuDrawer.classList.add("oculto");
      menuOpenIcon.classList.remove("oculto");
      menuCloseIcon.classList.add("oculto");
    });
  });
}

/* ==========================================================================
   CARROSSEL INTERATIVO - VOCÊ SABIA?
   ========================================================================== */
function initAbasFatos() {
  const factTopic = document.getElementById("topico-fato");
  const factTitle = document.getElementById("titulo-fato");
  const factDesc = document.getElementById("descricao-fato");
  const factButtons = document.querySelectorAll(".botao-fato");

  factButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const index = parseInt(btn.getAttribute("data-indice") || "0", 10);
      const data = fatos[index];

      factButtons.forEach(b => {
        b.classList.remove("ativo");
        const icon = b.querySelector("i");
        if (icon) icon.className = "texto-slate-500";
      });

      btn.classList.add("ativo");

      const showcase = document.getElementById("exposicao-fato");
      showcase.style.opacity = "0.3";
      showcase.style.transform = "translateY(5px)";

      setTimeout(() => {
        factTopic.innerHTML = `<i data-lucide="lightbulb" style="width: 0.88rem; height: 0.88rem;"></i> ${data.topic}`;
        factTitle.textContent = data.title;
        factDesc.textContent = data.desc;
        
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }

        showcase.style.opacity = "1";
        showcase.style.transform = "translateY(0)";
      }, 200);
    });
  });
}

/* ==========================================================================
   SIMULADOR MATEMÁTICO SOLAR & GRÁFICO DE PROJEÇÃO SVG
   ========================================================================== */
function initCalculadoraSolar() {
  const billSlider = document.getElementById("deslizador-fatura");
  const billDisplayVal = document.getElementById("valor-fatura-exibido");
  const btnRes = document.getElementById("botao-setor-residencial");
  const btnCom = document.getElementById("botao-setor-comercial");

  billSlider?.addEventListener("input", (e) => {
    const value = e.target.value;
    billDisplayVal.textContent = `R$ ${parseInt(value).toLocaleString("pt-BR")}`;
    recalcularMetricasSolar(parseInt(value));
  });

  btnRes?.addEventListener("click", () => {
    setorAtivo = "Residencial";
    btnRes.classList.add("ativo");
    btnCom.classList.remove("ativo");
    recalcularMetricasSolar(parseInt(billSlider.value));
  });

  btnCom?.addEventListener("click", () => {
    setorAtivo = "Comercial";
    btnCom.classList.add("ativo");
    btnRes.classList.remove("ativo");
    recalcularMetricasSolar(parseInt(billSlider.value));
  });

  // Cálculo inicial padrão
  recalcularMetricasSolar(450);
}

function recalcularMetricasSolar(bill) {
  const tarifa = 0.90; // kWh médio (Enel SP)
  const irradiacao = 4.4; // hsp/dia (Barueri - SP)
  const fatorPerda = 0.80; // Eficácia padrão

  const consumoMensalKwh = bill / tarifa;
  const kwpNecessario = consumoMensalKwh / (30 * irradiacao * fatorPerda);
  const capacidadePainel = 550; // Painéis de alta potência residenciais/comerciais
  const contagemPaineis = Math.ceil((kwpNecessario * 1000) / capacidadePainel);
  const areaTotal = contagemPaineis * 2.2; 

  const isResidencial = setorAtivo === "Residencial";
  const custoPorKwp = isResidencial ? 3800 : 3100;
  const investimentoTotal = kwpNecessario * custoPorKwp;
  const economiaMensal = bill * 0.95; // Corte máximo histórico de 95%
  const paybackAnos = investimentoTotal / (economiaMensal * 12);

  const fatorCarbonoEnel = 0.096; // 0.096 kg CO2 por kWh
  const co2EvitadoAnual = (consumoMensalKwh * 12 * fatorCarbonoEnel) / 1000; 
  const arvoresEquivalentes = Math.round(co2EvitadoAnual * 7);

  // Pintar na tela
  document.getElementById("res-economia-mensal").textContent = `R$ ${Math.round(economiaMensal).toLocaleString("pt-BR")}`;
  document.getElementById("res-placas-necessarias").innerHTML = `${contagemPaineis} <span class="texto-xs texto-slate-400 peso-suave">${contagemPaineis === 1 ? 'placa' : 'placas'}</span>`;
  document.getElementById("res-placas-area").textContent = `Área: ~${areaTotal.toFixed(1)} m²`;
  document.getElementById("res-retorno").innerHTML = `${paybackAnos.toFixed(1)} <span class="texto-xs texto-slate-400 peso-suave">${paybackAnos <= 1 ? 'ano' : 'anos'}</span>`;
  document.getElementById("res-co2").textContent = `${co2EvitadoAnual.toFixed(1)} t`;
  document.getElementById("res-arvores").textContent = `${arvoresEquivalentes}`;

  plotarGraficoPaybackDinamicamente(bill, investimentoTotal, economiaMensal);
}

function plotarGraficoPaybackDinamicamente(bill, investimento, economiaMensal) {
  const lineNoSolar = document.getElementById("linha-sem-solar");
  const lineSolar = document.getElementById("linha-com-solar");
  const pointsNoSolar = document.getElementById("pontos-grafico-sem-solar");
  const pointsSolar = document.getElementById("pontos-grafico-com-solar");
  const lblYMax = document.getElementById("rotulo-y-max");
  const capitalSavingsHighlight = document.getElementById("destaque-capital-salvo");

  const anos = [0, 5, 10, 15, 20, 25];
  const inflacaoEnergia = 0.055; // 5.5% inflação energética SP

  let trajSemSolar = [];
  let trajComSolar = [];

  trajSemSolar.push(0);
  trajComSolar.push(investimento); 

  let acumuladoSemSolar = 0;
  let acumuladoComSolar = investimento;

  for (let ano = 1; ano <= 25; ano++) {
    const faturaAnualSemSolar = (bill * 12) * Math.pow(1 + inflacaoEnergia, ano);
    acumuladoSemSolar += faturaAnualSemSolar;

    // Proprietário paga os 5% adicionais da taxa mínima Enel
    const faturaAnualComSolar = (bill * 0.05 * 12) * Math.pow(1 + inflacaoEnergia, ano);
    const taxaManutencaoInversor = (ano === 12) ? (investimento * 0.15) : 0;
    
    acumuladoComSolar += (faturaAnualComSolar + taxaManutencaoInversor);

    if (anos.includes(ano)) {
      trajSemSolar.push(acumuladoSemSolar);
      trajComSolar.push(acumuladoComSolar);
    }
  }

  const picoMaximoCusto = Math.max(trajSemSolar[5], trajComSolar[5]);
  
  if (lblYMax) {
    if (picoMaximoCusto >= 1000000) {
      lblYMax.textContent = `R$ ${(picoMaximoCusto / 1000000).toFixed(1)}M`;
    } else {
      lblYMax.textContent = `R$ ${Math.round(picoMaximoCusto / 1000).toLocaleString("pt-BR")}k`;
    }
  }

  const lucroLiquido25A = acumuladoSemSolar - acumuladoComSolar;
  if (capitalSavingsHighlight) {
    capitalSavingsHighlight.textContent = `R$ ${Math.round(lucroLiquido25A).toLocaleString("pt-BR")} líquidos acumulados e salvos!`;
  }

  const alturaGraficoMax = 180;
  const alturaGraficoMin = 40;
  const recuoX = 40;
  const larguraDisponivel = 440;

  let coordsSemSolar = [];
  let coordsComSolar = [];

  pointsNoSolar.innerHTML = "";
  pointsSolar.innerHTML = "";

  anos.forEach((ano, idx) => {
    const x = recuoX + (idx * (larguraDisponivel / 5));
    
    const vNS = trajSemSolar[idx];
    const vS = trajComSolar[idx];

    const yNS = alturaGraficoMax - ((vNS / picoMaximoCusto) * (alturaGraficoMax - alturaGraficoMin));
    const yS = alturaGraficoMax - ((vS / picoMaximoCusto) * (alturaGraficoMax - alturaGraficoMin));

    coordsSemSolar.push(`${x},${yNS}`);
    coordsComSolar.push(`${x},${yS}`);

    // Pontos Sem Solar
    const circNS = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circNS.setAttribute("cx", x);
    circNS.setAttribute("cy", yNS);
    circNS.setAttribute("r", "4.5");
    circNS.setAttribute("fill", "#f87171");
    circNS.setAttribute("stroke", "rgba(1, 4, 15, 0.9)");
    circNS.setAttribute("stroke-width", "1.5");
    
    const dNS = document.createElementNS("http://www.w3.org/2000/svg", "title");
    dNS.textContent = `Sem Solar (Ano ${ano}): R$ ${Math.round(vNS).toLocaleString("pt-BR")}`;
    circNS.appendChild(dNS);
    pointsNoSolar.appendChild(circNS);

    // Pontos Com Solar
    const circS = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circS.setAttribute("cx", x);
    circS.setAttribute("cy", yS);
    circS.setAttribute("r", "5");
    circS.setAttribute("fill", "#34d399");
    circS.setAttribute("stroke", "rgba(1, 4, 15, 0.9)");
    circS.setAttribute("stroke-width", "1.5");
    circS.style.cursor = "pointer";

    const dS = document.createElementNS("http://www.w3.org/2000/svg", "title");
    dS.textContent = `Com Solar (Ano ${ano}): R$ ${Math.round(vS).toLocaleString("pt-BR")}`;
    circS.appendChild(dS);
    pointsSolar.appendChild(circS);
  });

  lineNoSolar.setAttribute("points", coordsSemSolar.join(" "));
  lineSolar.setAttribute("points", coordsComSolar.join(" "));
}

/* ==========================================================================
   BUSCA FILTRADA DE BAIRROS EM BARUERI
   ========================================================================== */
function initGradeBairros() {
  const searchInput = document.getElementById("pesquisa-bairro");
  const filterButtons = document.querySelectorAll(".botao-filtro");

  searchInput?.addEventListener("input", (e) => {
    termoPesquisaAtivo = e.target.value;
    pintarBairrosFiltrados();
  });

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("ativo"));
      btn.classList.add("ativo");
      filtroRegiaoAtiva = btn.getAttribute("data-regiao") || "Todos";
      pintarBairrosFiltrados();
    });
  });

  pintarBairrosFiltrados();
}

function pintarBairrosFiltrados() {
  const container = document.getElementById("grade-bairros");
  if (!container) return;

  container.innerHTML = "";

  const bairrosCompativeis = bairros.filter(nb => {
    const batimentoTexto = nb.name.toLowerCase().includes(termoPesquisaAtivo.toLowerCase()) ||
                            nb.desc.toLowerCase().includes(termoPesquisaAtivo.toLowerCase());
    
    const batimentoRegiao = filtroRegiaoAtiva === "Todos" || nb.region === filtroRegiaoAtiva;

    return batimentoTexto && batimentoRegiao;
  });

  if (bairrosCompativeis.length === 0) {
    container.innerHTML = `
      <div class="preenchimento-8 texto-centro painel-vidro largura-total" style="grid-column: 1 / -1; border-radius: 12px;">
        <i data-lucide="compass-off" class="texto-slate-500 margem-b-3" style="width: 2.5rem; height: 2.5rem; margin: 0 auto 10px;"></i>
        <h4 class="fonte-titulo peso-medio texto-branco margem-b-2" style="font-size: 0.88rem;">Nenhum bairro encontrado</h4>
        <p class="fonte-sans texto-slate-400" style="font-size: 0.75rem;">Ajuste seu termo de pesquisa ou marque a aba "Todos".</p>
      </div>
    `;
    if (typeof lucide !== 'undefined') lucide.createIcons();
    return;
  }

  bairrosCompativeis.forEach((nb, idx) => {
    const card = document.createElement("div");
    card.className = "cartao-vidro brilho-hover transicao-geral";
    card.style.opacity = "0";
    card.style.transform = "translateY(15px)";
    card.style.animation = `fadeInShift 0.35s cubic-bezier(0.4, 0, 0.2, 1) forwards ${idx * 0.05}s`;

    let estrelasText = "★".repeat(nb.score) + "☆".repeat(5 - nb.score);

    card.innerHTML = `
      <div class="topo-cartao texto-esquerda">
        <div class="linha-cabecalho-cartao">
          <span class="pilula-regiao">${nb.region}</span>
          <span class="rotulo-indicador texto-esmeralda fonte-mono"><i data-lucide="sun" style="width: 0.88rem; height: 0.88rem;"></i> ${nb.efficiency}</span>
        </div>
        <h3 class="texto-branco margem-b-2" style="font-size: 1.15rem;">${nb.name}</h3>
        <p class="texto-slate-400 peso-suave" style="font-size: 0.75rem;">${nb.desc}</p>
      </div>
      <div class="rodape-cartao largura-total">
        <span class="rotulo-indicador">Viabilidade</span>
        <span class="indicador-estrelas texto-ambar fonte-mono">${estrelasText}</span>
      </div>
    `;

    container.appendChild(card);
  });

  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

/* ==========================================================================
   MURAL DE APOIO COMMUNITY & FORMULÁRIO DE CADASTRO
   ========================================================================== */
const STORAGE_KEY_SUBMISSIONS = "barueri_solar_submissions";

function obterSubmissoesSalvas() {
  const storedSubmissions = localStorage.getItem(STORAGE_KEY_SUBMISSIONS);
  if (!storedSubmissions) return [...apoiadoresIniciais];

  try {
    const submissionsList = JSON.parse(storedSubmissions);
    return Array.isArray(submissionsList) ? submissionsList : [...apoiadoresIniciais];
  } catch {
    localStorage.removeItem(STORAGE_KEY_SUBMISSIONS);
    return [...apoiadoresIniciais];
  }
}

function escaparHtml(valor) {
  return String(valor ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#039;"
  }[char]));
}

function initContatoEMural() {
  const contactForm = document.getElementById("formulario-contato");
  const formSuccessAlert = document.getElementById("form-alerta-sucesso");
  const selectNeighborhood = document.getElementById("form-bairro");

  if (selectNeighborhood) {
    const nomesOrdenados = [...bairros].map(n => n.name).sort();
    nomesOrdenados.forEach(nome => {
      const opt = document.createElement("option");
      opt.value = nome;
      opt.innerText = nome;
      selectNeighborhood.appendChild(opt);
    });
  }

  // Pintar apoiadores iniciais
  paintMuralDeApoio();

  contactForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    const nomeVal = document.getElementById("form-nome").value.trim();
    const bairroVal = document.getElementById("form-bairro").value;
    const perfilVal = document.getElementById("form-perfil").value;
    const msgVal = document.getElementById("form-mensagem").value.trim();

    const novaProposta = {
      name: nomeVal,
      profile: perfilVal,
      location: bairroVal,
      text: msgVal,
      date: "Há instantes"
    };

    let submissionsList = obterSubmissoesSalvas();

    submissionsList.unshift(novaProposta);
    localStorage.setItem(STORAGE_KEY_SUBMISSIONS, JSON.stringify(submissionsList));

    formSuccessAlert?.classList.remove("oculto");
    if (formSuccessAlert) formSuccessAlert.style.opacity = "1";

    contactForm.reset();
    paintMuralDeApoio();

    setTimeout(() => {
      if (!formSuccessAlert) return;
      formSuccessAlert.style.transition = "opacity 1s ease";
      formSuccessAlert.style.opacity = "0";
      setTimeout(() => {
        formSuccessAlert.classList.add("oculto");
      }, 1000);
    }, 6000);
  });
}

function paintMuralDeApoio() {
  const muralContainer = document.getElementById("lista-mural");
  const muralCountVal = document.getElementById("mural-valor-contagem");
  
  if (!muralContainer) return;

  muralContainer.innerHTML = "";

  let submissionsList = obterSubmissoesSalvas();

  if (muralCountVal) {
    muralCountVal.textContent = `${submissionsList.length} ${submissionsList.length === 1 ? 'proposta' : 'propostas'}`;
  }

  // Máximo de 5 apoiadores para economizar espaço
  const visualizados = submissionsList.slice(0, 5);

  visualizados.forEach((supp, idx) => {
    const item = document.createElement("div");
    item.className = "item-mural";
    item.style.opacity = "0";
    item.style.transform = "translateX(20px)";
    item.style.animation = `fadeMuralIn 0.35s cubic-bezier(0.4, 0, 0.2, 1) forwards ${idx * 0.08}s`;

    item.innerHTML = `
      <div class="meta-item-mural texto-esquerda">
        <div>
          <span class="nome-meta bloco">${escaparHtml(supp.name)}</span>
          <div class="etiquetas-meta flex itens-centro espaco-2">
            <span class="etiqueta-perfil">${escaparHtml(supp.profile)}</span>
            <span class="etiqueta-bairro fonte-mono" style="font-weight: 700;">${escaparHtml(supp.location)}</span>
          </div>
        </div>
        <span class="tempo-meta">${escaparHtml(supp.date)}</span>
      </div>
      <p class="texto-slate-300 peso-suave" style="font-size: 0.75rem; text-align: left; line-height: 1.5; margin-top: 0.25rem;">
        "${escaparHtml(supp.text)}"
      </p>
    `;

    muralContainer.appendChild(item);
  });

}
