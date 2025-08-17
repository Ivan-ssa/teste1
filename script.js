// Pega os elementos do HTML
const regionSelect = document.getElementById('region-select');
const countriesContainer = document.getElementById('countries-container');

const API_BASE_URL = 'https://restcountries.com/v3.1/region/';

// Função para buscar os países de uma região específica
const fetchCountriesByRegion = async (region) => {
    // Se nenhuma região for selecionada, limpa a tela e sai da função
    if (!region) {
        countriesContainer.innerHTML = '<p>Por favor, selecione uma região acima.</p>';
        return;
    }

    // Mostra um feedback de "carregando"
    countriesContainer.innerHTML = '<p>Carregando países...</p>';

    try {
        const response = await fetch(`${API_BASE_URL}${region}`);
        if (!response.ok) {
            throw new Error('Não foi possível buscar os dados.');
        }

        const countries = await response.json();
        displayCountries(countries);

    } catch (error) {
        countriesContainer.innerHTML = '<p>Ocorreu um erro ao carregar os países.</p>';
        console.error('Erro:', error);
    }
};

// Função para exibir os países na tela
const displayCountries = (countries) => {
    // Limpa o container antes de adicionar os novos cards
    countriesContainer.innerHTML = '';

    // Ordena os países por ordem alfabética
    countries.sort((a, b) => a.name.common.localeCompare(b.name.common));

    // Para cada país na lista, cria um card
    countries.forEach(country => {
        // Pega a capital (API retorna um array, pegamos o primeiro item)
        // Usa um operador ternário para caso não exista capital
        const capital = country.capital ? country.capital[0] : 'N/A';

        const countryCardHtml = `
            <div class="country-card">
                <img src="${country.flags.svg}" alt="Bandeira de ${country.name.common}">
                <h2>${country.name.common}</h2>
                <p><strong>Capital:</strong> ${capital}</p>
            </div>
        `;
        // Adiciona o novo card ao container
        countriesContainer.innerHTML += countryCardHtml;
    });
};


// Adiciona um evento que é disparado toda vez que o usuário muda a opção no menu
regionSelect.addEventListener('change', () => {
    const selectedRegion = regionSelect.value;
    fetchCountriesByRegion(selectedRegion);
});

// Mensagem inicial
countriesContainer.innerHTML = '<p>Por favor, selecione uma região acima.</p>';
