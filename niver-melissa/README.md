# 🍯 Site Aniversário da Mel - 1 Aninho

Site temático inspirado no Ursinho Pooh para celebrar o primeiro aniversário da Melissa, nossa pequena guardiã do bosque encantado.

## ✨ Características Principais

- **Design Aquarela**: Visual inspirado no estilo aquarela do Ursinho Pooh
- **Totalmente Responsivo**: Otimizado para todos os dispositivos
- **Lista de Presentes Inteligente**: Sistema especial considerando limitações de bagagem de viagem
- **Galeria de Mídia**: Seção para fotos e vídeos otimizada para performance
- **RSVP Integrado**: Sistema de confirmação de presença
- **Animações Suaves**: Experiência visual encantadora

## 🎨 Funcionalidades

### Navegação
- Menu responsivo com navegação suave
- Indicador de seção ativa
- Design mobile-first

### Seções do Site

1. **Hero Section** - Apresentação da festa com elementos flutuantes animados
2. **Sobre a Festa** - História da Mel e detalhes do tema
3. **Informações** - Data, local, dress code e detalhes do evento
4. **Lista de Presentes** - Sistema categorizando presentes por tipo de transporte:
   - 🧳 Levar na Bagagem (itens pequenos/leves)
   - 🏠 Usar no Brasil (itens grandes para usar durante a estadia)
   - 📦 Enviar por Correio (para posterior envio a Portugal)
   - 💰 Contribuição (PIX)
5. **Galeria** - Fotos e vídeos da Mel
6. **RSVP** - Formulário de confirmação de presença

### Sistema de Presentes
- **Seleção Inteligente**: Clique para escolher presentes
- **Persistência Local**: Mantém seleções mesmo após recarregar
- **Notificações**: Feedback visual para ações
- **Cópia de PIX**: Um clique para copiar chave PIX

### Formulário RSVP
- **Confirmação Completa**: Nome, número de pessoas, restrições
- **Mensagens Personalizadas**: Campo para mensagens para a Mel
- **Modal de Confirmação**: Feedback visual após envio

## 🛠️ Como Usar

### 1. Personalização Básica
Edite as seguintes informações no `index.html`:

```html
<!-- Atualizar data da festa -->
<span>Em breve - Data a confirmar</span> 
<!-- Substituir por: -->
<span>15 de Dezembro, 2024</span>

<!-- Adicionar local completo -->
<p><strong>Endereço:</strong><br>[Adicionar endereço completo]</p>

<!-- Adicionar contatos -->
<p><i class="fas fa-whatsapp"></i> [Adicionar WhatsApp]</p>
<p><i class="fas fa-envelope"></i> [Adicionar email]</p>

<!-- Adicionar chave PIX -->
<span class="gift-name">PIX: [Adicionar chave PIX]</span>
```

### 2. Adicionando Fotos
Substitua os placeholders de foto:

```html
<div class="photo-placeholder">
    <!-- Substituir por: -->
    <img src="caminho/para/foto.jpg" alt="Mel - 1 ano">
</div>
```

### 3. Configurando Lista de Presentes
Personalize os presentes em cada categoria editando as seções `.gift-list` no HTML.

### 4. Ativando Countdown
Descomente e configure a data no `script.js`:

```javascript
// Ativar countdown definindo a data
new CountdownManager('2024-12-15 15:00:00');
```

## 📱 Recursos Mobile

- **Hamburger Menu**: Navegação otimizada para touch
- **Gestos Touch**: Suporte completo a gestos móveis
- **Performance**: Carregamento otimizado para conexões lentas
- **Layout Adaptativo**: Reorganização inteligente do conteúdo

## 🎯 Recursos Especiais para Viagem

### Sistema de Categorização de Presentes
Pensado especificamente para quem mora no exterior:

- **Bagagem**: Itens que cabem na mala e passam pela alfândega
- **Brasil**: Presentes para usar durante a estadia
- **Correio**: Para envio posterior via correios
- **PIX**: Contribuições financeiras

### Galeria Otimizada
- **Lazy Loading**: Carregamento sob demanda
- **Compressão Inteligente**: Otimização automática de imagens
- **Suporte a Vídeo**: Player otimizado para web

## 🚀 Hospedagem

### Opção 1: GitHub Pages (Gratuito)
1. Crie repositório no GitHub
2. Faça upload dos arquivos
3. Ative GitHub Pages nas configurações
4. Site ficará disponível em: `username.github.io/niver-melissa`

### Opção 2: Netlify (Gratuito)
1. Arraste a pasta do projeto para netlify.com
2. Site fica online automaticamente
3. Domínio personalizado disponível

### Opção 3: Hospedagem Tradicional
Faça upload dos arquivos via FTP para qualquer hospedagem web.

## 💡 Dicas de Personalização

### Cores do Tema
Edite as variáveis CSS em `styles.css`:
```css
:root {
    --primary-color: #F4A259; /* Laranja mel */
    --secondary-color: #E76F51; /* Vermelho Pooh */
    --accent-color: #E9C46A; /* Amarelo */
    --forest-green: #2A9D8F; /* Verde bosque */
    /* ... outras cores */
}
```

### Adicionando Mais Seções
Siga o padrão das seções existentes:
```html
<section id="nova-secao" class="nova-secao">
    <div class="container">
        <div class="section-header">
            <h2>Título da Seção</h2>
            <p>Descrição da seção</p>
        </div>
        <!-- Conteúdo -->
    </div>
</section>
```

## 📞 Suporte Técnico

Para modificações mais avançadas ou dúvidas técnicas:
- Edite os arquivos HTML, CSS e JS conforme necessário
- Use o console do navegador (F12) para debug
- Teste sempre em dispositivos móveis

## 🎉 Resultado Final

Um site completo e profissional que:
- ✅ Celebra o aniversário da Mel com muito amor
- ✅ Facilita o planejamento da festa
- ✅ Resolve o problema das limitações de bagagem
- ✅ Oferece experiência única para os convidados
- ✅ Funciona perfeitamente em todos os dispositivos

**Que a festa da Mel seja tão doce quanto o mel do Ursinho Pooh! 🍯🎂**