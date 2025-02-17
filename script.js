
        document.addEventListener("DOMContentLoaded", () => {
            const dispositivosContainer = document.getElementById("dispositivosContainer");
            const addDispositivo = document.getElementById("addDispositivo");
            const calcular = document.getElementById("calcular");
            const resultado = document.getElementById("resultado");
            const tipoImovel = document.getElementById("tipoImovel");
            const dispositivosTabela = document.getElementById("dispositivosTabela");

            const dispositivos = [
                { nome: "Banheira", fator: 2, tipo: "hot,cold" },
                { nome: "Bidé", fator: 1, tipo: "cold" },
                { nome: "Estação de Água Potável", fator: 1, tipo: "cold" },
                { nome: "Máquina de lavar louça (doméstica)", fator: 2, tipo: "hot,cold" },
                { nome: "Máquina de lavar louça (comercial)", fator: 6, tipo: "hot,cold" },
                { nome: "Pia de cozinha, residencial", fator: 2, tipo: "hot,cold" },
                { nome: "Pia de cozinha, comercial", fator: 6, tipo: "hot,cold" },
                { nome: "Preparação de vegetais", fator: 2, tipo: "hot,cold" },
                { nome: "Pias de lavagem de mãos", fator: 1, tipo: "hot,cold" },
                { nome: "Pias de xampu", fator: 1, tipo: "hot,cold" },
                { nome: "Privada", fator: 1, tipo: "cold" },
                { nome: "Pias de lavanderia", fator: 2, tipo: "hot,cold" },
                { nome: "Válvula de chuveiro (única)", fator: 2, tipo: "hot,cold" },
                { nome: "Válvula de chuveiro (múltiplas)", fator: 6, tipo: "hot,cold" },
                { nome: "Pias de serviço", fator: 2, tipo: "hot,cold" },
                { nome: "Pias de aro de descarga", fator: 6, tipo: "hot,cold" },
                { nome: "Válvula de lavanderia", fator: 2, tipo: "hot,cold" },
                { nome: "Urinol", fator: 6, tipo: "cold" },
                { nome: "Vaso (tanque)", fator: 1, tipo: "cold" },
                { nome: "Sanita (válvula)", fator: 12, tipo: "cold" },
                { nome: "Conexões de mangueira", fator: 2, tipo: "cold" },
            ];

            function addDispositivoField() {
                const wrapper = document.createElement("div");
                wrapper.classList.add("dispositivo-item");

                const dispositivoSelect = document.createElement("select");
                dispositivos.forEach((dispositivo) => {
                    const option = document.createElement("option");
                    option.value = `${dispositivo.fator},${dispositivo.tipo}`;
                    option.textContent = dispositivo.nome;
                    dispositivoSelect.appendChild(option);
                });

                const quantidadeSelect = document.createElement("select");
                for (let i = 1; i <= 20; i++) {
                    const option = document.createElement("option");
                    option.value = i;
                    option.textContent = i;
                    quantidadeSelect.appendChild(option);
                }

                const tipoSelect = document.createElement("select");
                ["hot", "cold", "hot,cold"].forEach((tipo) => {
                    const option = document.createElement("option");
                    option.value = tipo;
                    option.textContent = tipo;
                    tipoSelect.appendChild(option);
                });

                const removerButton = document.createElement("button");
                removerButton.textContent = "Remover";
                removerButton.addEventListener("click", () => {
                    wrapper.remove();
                    updateTabela(); // Atualiza a tabela sempre que um dispositivo é removido
                });

                wrapper.appendChild(dispositivoSelect);
                wrapper.appendChild(quantidadeSelect);
                wrapper.appendChild(tipoSelect);
                wrapper.appendChild(removerButton);

                dispositivosContainer.appendChild(wrapper);
                updateTabela(); // Atualiza a tabela após adicionar um novo dispositivo
            }

            function updateTabela() {
                // Limpar a tabela
                dispositivosTabela.innerHTML = `
                    <tr>
                        <th>Dispositivo</th>
                        <th>Quantidade</th>
                        <th>Tipo</th>
                        <th>Fator</th>
                    </tr>
                `;
                
                // Atualizar a tabela com os dispositivos selecionados
                dispositivosContainer.querySelectorAll(".dispositivo-item").forEach((wrapper) => {
                    const [dispositivoSelect, quantidadeSelect, tipoSelect] = wrapper.querySelectorAll("select");
                    const [fator, tipo] = dispositivoSelect.value.split(",");
                    const quantidade = parseInt(quantidadeSelect.value, 10);
                    const tipoSelecionado = tipoSelect.value;

                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${dispositivoSelect.options[dispositivoSelect.selectedIndex].text}</td>
                        <td>${quantidade}</td>
                        <td>${tipoSelecionado}</td>
                        <td>${fator}</td>
                    `;
                    dispositivosTabela.appendChild(row);
                });
            }

            function calcularTamanho() {
                let totalFator = { hot: 0, cold: 0 };
                dispositivosContainer.querySelectorAll(".dispositivo-item").forEach((wrapper) => {
                    const [dispositivoSelect, quantidadeSelect, tipoSelect] = wrapper.querySelectorAll("select");
                    const [fator, tipo] = dispositivoSelect.value.split(",");
                    const quantidade = parseInt(quantidadeSelect.value, 10);
                    const tipoSelecionado = tipoSelect.value;

                    if (tipoSelecionado.includes("hot")) {
                        totalFator.hot += parseFloat(fator) * quantidade;
                    }
                    if (tipoSelecionado.includes("cold")) {
                        totalFator.cold += parseFloat(fator) * quantidade;
                    }
                });

                const fatorDemanda = parseFloat(tipoImovel.value);
                const capacidadeHot = totalFator.hot * fatorDemanda;
                const capacidadeCold = totalFator.cold * fatorDemanda;

                resultado.textContent = `Capacidade Hot: ${capacidadeHot.toFixed(2)}, Capacidade Cold: ${capacidadeCold.toFixed(2)}`;

                // Agora que o cálculo foi feito, mostramos a tabela
                dispositivosTabela.style.display = "table"; // Exibe a tabela
                updateTabela(); // Atualiza a tabela com os dispositivos
            }

            addDispositivo.addEventListener("click", addDispositivoField);
            calcular.addEventListener("click", calcularTamanho);
        });


        //login//
        

    

