// Função para revelar elementos ao rolar a página
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');

  reveals.forEach((reveal) => {
    const windowHeight = window.innerHeight;
    const revealTop = reveal.getBoundingClientRect().top;
    const revealPoint = 150;

    if (revealTop < windowHeight - revealPoint) {
      reveal.classList.add('active');
    } else {
      reveal.classList.remove('active');
    }
  });
}

const links = document.querySelectorAll("nav a");
const sections = document.querySelectorAll("section");

// Adiciona evento de clique a cada link
links.forEach(link => {
  link.addEventListener("click", () => {
    // Obtém o atributo data-section do link
    const target = link.getAttribute("data-section");

    // Esconde todas as seções
    sections.forEach(section => {
      section.classList.remove("active");
    });

    // Mostra a seção correspondente
    document.getElementById(target).classList.add("active");
  });
});


window.addEventListener('scroll', () => {
  revealOnScroll();
});

// Input Liturgia Diaria
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('subscribeForm');
    const feedback = document.getElementById('form-feedback');
    const btn = document.getElementById('btn-submit');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Carregando
        const originalText = btn.innerHTML;
        btn.innerHTML = 'Enviando...';
        btn.disabled = true;

        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;

        // Dados
        const data = { nome: nome, email: email };

        try {
            
            const webhookURL = 'https://iastation.app.n8n.cloud/webhook-test/32c7fc5c-26f7-4dac-bb2d-6ec2f4c834e9'; 

            await fetch(webhookURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            feedback.style.display = 'block';
            feedback.innerText = 'Inscrição realizada com sucesso! Verifique seu e-mail em breve.';
            feedback.style.color = '#4caf50';
            form.reset();

        } catch (error) {
            console.error('Erro:', error);
            feedback.style.display = 'block';
            feedback.innerText = 'Houve um erro. Tente novamente mais tarde.';
            feedback.style.color = '#ff5252';
        } finally {
            btn.innerHTML = originalText;
            btn.disabled = false;
        }
    });
});