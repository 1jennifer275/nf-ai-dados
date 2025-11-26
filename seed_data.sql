-- ==========================================
-- SCRIPT DE SEED COM 200+ REGISTROS DE TESTE
-- Sistema NF-AI - Dados para testar navegabilidade e RAG
-- ==========================================

-- Limpar dados existentes (exceto classificações padrão)
-- DELETE FROM "MovimentoContas_has_Classificacao";
-- DELETE FROM movimento_contas;
-- DELETE FROM pessoas WHERE "idPessoas" > 0;

-- ==========================================
-- INSERIR PESSOAS (80 registros)
-- ==========================================

-- FORNECEDORES (40 registros)
INSERT INTO pessoas (tipo, razaosocial, fantasia, documento, status) VALUES
('FORNECEDOR', 'Agroquímica Brasil Ltda', 'Agro Brasil', '12.345.678/0001-90', 'ATIVO'),
('FORNECEDOR', 'Fertilizantes do Campo S.A.', 'Campo Fértil', '23.456.789/0001-01', 'ATIVO'),
('FORNECEDOR', 'Sementes Premium Agro', 'Premium Agro', '34.567.890/0001-12', 'ATIVO'),
('FORNECEDOR', 'Defensivos Agrícolas Norte', 'Defensivos Norte', '45.678.901/0001-23', 'ATIVO'),
('FORNECEDOR', 'Máquinas Agrícolas Sul Ltda', 'Máquinas Sul', '56.789.012/0001-34', 'ATIVO'),
('FORNECEDOR', 'Peças e Implementos Campos', 'Peças Campos', '67.890.123/0001-45', 'ATIVO'),
('FORNECEDOR', 'Combustíveis Rurais Ltda', 'Combustíveis Rurais', '78.901.234/0001-56', 'ATIVO'),
('FORNECEDOR', 'Posto Agrícola Cerrado', 'Posto Cerrado', '89.012.345/0001-67', 'ATIVO'),
('FORNECEDOR', 'Lubrificantes e Óleos Agro', 'Óleos Agro', '90.123.456/0001-78', 'ATIVO'),
('FORNECEDOR', 'Ferragens Rural Ltda', 'Ferragens Rural', '01.234.567/0001-89', 'ATIVO'),
('FORNECEDOR', 'Armazéns Gerais do Brasil', 'Armazéns Brasil', '12.345.678/0002-90', 'ATIVO'),
('FORNECEDOR', 'Transportadora Campo Limpo', 'Campo Limpo Trans', '23.456.789/0002-01', 'ATIVO'),
('FORNECEDOR', 'Serviços Agrícolas União', 'Agro União', '34.567.890/0002-12', 'ATIVO'),
('FORNECEDOR', 'Colheitas Mecanizadas S.A.', 'Colheitas S.A.', '45.678.901/0002-23', 'ATIVO'),
('FORNECEDOR', 'Pulverização Aérea Brasil', 'Pulverização Aérea', '56.789.012/0002-34', 'ATIVO'),
('FORNECEDOR', 'Energia Rural Distribuidora', 'Energia Rural', '67.890.123/0002-45', 'ATIVO'),
('FORNECEDOR', 'Água e Irrigação Ltda', 'Água Irrigação', '78.901.234/0002-56', 'ATIVO'),
('FORNECEDOR', 'Materiais de Construção Agrícola', 'Mat Construção Agro', '89.012.345/0002-67', 'ATIVO'),
('FORNECEDOR', 'Ferramentas Profissionais Rural', 'Ferramentas Rural', '90.123.456/0002-78', 'ATIVO'),
('FORNECEDOR', 'Seguros Agrícolas Nacional', 'Seguros Agrícolas', '01.234.567/0002-89', 'ATIVO'),
('FORNECEDOR', 'Contabilidade Rural Expert', 'Contabil Rural', '12.345.678/0003-90', 'ATIVO'),
('FORNECEDOR', 'Advocacia Agrária Silva', 'Advocacia Silva', '23.456.789/0003-01', 'ATIVO'),
('FORNECEDOR', 'Engenharia Agronômica Campos', 'Eng Agronômica', '34.567.890/0003-12', 'ATIVO'),
('FORNECEDOR', 'Banco Agrícola do Brasil', 'Banco Agrícola', '45.678.901/0003-23', 'ATIVO'),
('FORNECEDOR', 'Cooperativa Agrícola Central', 'Coop Agrícola', '56.789.012/0003-34', 'ATIVO'),
('FORNECEDOR', 'Insumos Tecnológicos Agro', 'Insumos Tech', '67.890.123/0003-45', 'ATIVO'),
('FORNECEDOR', 'Biotecnologia Rural Ltda', 'Biotec Rural', '78.901.234/0003-56', 'ATIVO'),
('FORNECEDOR', 'Análises Laboratoriais Agro', 'Lab Agro', '89.012.345/0003-67', 'ATIVO'),
('FORNECEDOR', 'Climatização Rural S.A.', 'Clima Rural', '90.123.456/0003-78', 'ATIVO'),
('FORNECEDOR', 'Automação Agrícola Brasil', 'Auto Agro', '01.234.567/0003-89', 'ATIVO'),
('FORNECEDOR', 'Sistemas de Irrigação Campos', 'Sistemas Irrigação', '12.345.678/0004-90', 'ATIVO'),
('FORNECEDOR', 'Drones Agrícolas Brasil', 'Drones Agro', '23.456.789/0004-01', 'ATIVO'),
('FORNECEDOR', 'Meteorologia Rural Ltda', 'Meteoro Rural', '34.567.890/0004-12', 'ATIVO'),
('FORNECEDOR', 'Geotecnologia Agrícola', 'Geo Agrícola', '45.678.901/0004-23', 'ATIVO'),
('FORNECEDOR', 'Manutenção Rural Express', 'Manutenção Express', '56.789.012/0004-34', 'ATIVO'),
('FORNECEDOR', 'Oficina Mecânica Campos', 'Oficina Campos', '67.890.123/0004-45', 'ATIVO'),
('FORNECEDOR', 'Eletrônica Rural Ltda', 'Eletrônica Rural', '78.901.234/0004-56', 'ATIVO'),
('FORNECEDOR', 'Hidráulica Agrícola Brasil', 'Hidráulica Agro', '89.012.345/0004-67', 'ATIVO'),
('FORNECEDOR', 'Pneumáticos e Pneus Agro', 'Pneus Agro', '90.123.456/0004-78', 'ATIVO'),
('FORNECEDOR', 'Distribuidora Agrícola Geral', 'Distrib Agrícola', '01.234.567/0004-89', 'ATIVO');

-- CLIENTES (20 registros)
INSERT INTO pessoas (tipo, razaosocial, fantasia, documento, status) VALUES
('CLIENTE', 'Cooperativa de Grãos do Sul', 'Coop Grãos Sul', '11.222.333/0001-01', 'ATIVO'),
('CLIENTE', 'Trading Agrícola Internacional', 'Trading Inter', '22.333.444/0001-02', 'ATIVO'),
('CLIENTE', 'Agroindústria Alimentos S.A.', 'Agro Alimentos', '33.444.555/0001-03', 'ATIVO'),
('CLIENTE', 'Exportadora Brasil Grãos', 'Export Brasil', '44.555.666/0001-04', 'ATIVO'),
('CLIENTE', 'Moinho de Trigo Nacional', 'Moinho Nacional', '55.666.777/0001-05', 'ATIVO'),
('CLIENTE', 'Fábrica de Ração Animal', 'Ração Animal', '66.777.888/0001-06', 'ATIVO'),
('CLIENTE', 'Indústria de Óleos Vegetais', 'Óleos Vegetais', '77.888.999/0001-07', 'ATIVO'),
('CLIENTE', 'Cerealista Campos do Brasil', 'Cerealista Campos', '88.999.000/0001-08', 'ATIVO'),
('CLIENTE', 'Distribuidora de Grãos Ltda', 'Distrib Grãos', '99.000.111/0001-09', 'ATIVO'),
('CLIENTE', 'Compradora Agrícola Regional', 'Compradora Regional', '00.111.222/0001-10', 'ATIVO'),
('CLIENTE', 'Armazém Geral de Cereais', 'Armazém Cereais', '11.222.333/0002-01', 'ATIVO'),
('CLIENTE', 'Empresa de Commodities S.A.', 'Commodities S.A.', '22.333.444/0002-02', 'ATIVO'),
('CLIENTE', 'Processadora de Soja Brasil', 'Process Soja', '33.444.555/0002-03', 'ATIVO'),
('CLIENTE', 'Importadora de Grãos Ltda', 'Import Grãos', '44.555.666/0002-04', 'ATIVO'),
('CLIENTE', 'Atacadista Agrícola Nacional', 'Atacado Agrícola', '55.666.777/0002-05', 'ATIVO'),
('CLIENTE', 'Mercado Agrícola Central', 'Mercado Central', '66.777.888/0002-06', 'ATIVO'),
('CLIENTE', 'Feira do Produtor Rural', 'Feira Produtor', '77.888.999/0002-07', 'ATIVO'),
('CLIENTE', 'Supermercados Rurais Ltda', 'Super Rurais', '88.999.000/0002-08', 'ATIVO'),
('CLIENTE', 'Rede de Varejo Agrícola', 'Varejo Agrícola', '99.000.111/0002-09', 'ATIVO'),
('CLIENTE', 'Consórcio de Compradores', 'Consórcio Compra', '00.111.222/0002-10', 'ATIVO');

-- FATURADOS (20 registros)
INSERT INTO pessoas (tipo, razaosocial, fantasia, documento, status) VALUES
('FATURADO', 'Fazenda Santa Rita Ltda', 'Fazenda Santa Rita', '10.111.222/0001-01', 'ATIVO'),
('FATURADO', 'Agropecuária Boa Vista S.A.', 'Agro Boa Vista', '20.222.333/0001-02', 'ATIVO'),
('FATURADO', 'Fazenda Esperança Verde', 'Esperança Verde', '30.333.444/0001-03', 'ATIVO'),
('FATURADO', 'Sítio Bela Vista Rural', 'Sítio Bela Vista', '40.444.555/0001-04', 'ATIVO'),
('FATURADO', 'Fazenda Três Irmãos', 'Três Irmãos', '50.555.666/0001-05', 'ATIVO'),
('FATURADO', 'Agropecuária Novo Horizonte', 'Novo Horizonte', '60.666.777/0001-06', 'ATIVO'),
('FATURADO', 'Fazenda Primavera Ltda', 'Fazenda Primavera', '70.777.888/0001-07', 'ATIVO'),
('FATURADO', 'Sítio Campo Alegre', 'Campo Alegre', '80.888.999/0001-08', 'ATIVO'),
('FATURADO', 'Fazenda Vale Verde S.A.', 'Vale Verde', '90.999.000/0001-09', 'ATIVO'),
('FATURADO', 'Agropecuária Sol Nascente', 'Sol Nascente', '01.000.111/0001-10', 'ATIVO'),
('FATURADO', 'Fazenda Rio Claro', 'Rio Claro', '10.111.222/0002-01', 'ATIVO'),
('FATURADO', 'Sítio Monte Alto', 'Monte Alto', '20.222.333/0002-02', 'ATIVO'),
('FATURADO', 'Fazenda Serra Azul', 'Serra Azul', '30.333.444/0002-03', 'ATIVO'),
('FATURADO', 'Agropecuária Cerrado Verde', 'Cerrado Verde', '40.444.555/0002-04', 'ATIVO'),
('FATURADO', 'Fazenda Pantanal Sul', 'Pantanal Sul', '50.555.666/0002-05', 'ATIVO'),
('FATURADO', 'Sítio Água Cristalina', 'Água Cristalina', '60.666.777/0002-06', 'ATIVO'),
('FATURADO', 'Fazenda Planalto Central', 'Planalto Central', '70.777.888/0002-07', 'ATIVO'),
('FATURADO', 'Agropecuária Campos do Sul', 'Campos Sul', '80.888.999/0002-08', 'ATIVO'),
('FATURADO', 'Fazenda Estrela Dalva', 'Estrela Dalva', '90.999.000/0002-09', 'ATIVO'),
('FATURADO', 'Sítio Recanto Feliz', 'Recanto Feliz', '01.000.111/0002-10', 'ATIVO');

-- ==========================================
-- INSERIR MOVIMENTOS (120 registros)
-- ==========================================

-- Despesas (90 registros) - Distribuídas ao longo de 2024
INSERT INTO movimento_contas (tipo, numeronotafiscal, dataemissao, descricao, status, valortotal, "Pessoas_idFornecedorCliente", "Pessoas_idFaturado") VALUES
-- Janeiro 2024
('DESPESA', 'NF-001', '2024-01-05', 'Compra de sementes de soja para safra 2024', 'ATIVO', 45000.00, 3, 61),
('DESPESA', 'NF-002', '2024-01-08', 'Fertilizante NPK 20-20-20 - 50 toneladas', 'ATIVO', 82000.00, 2, 62),
('DESPESA', 'NF-003', '2024-01-12', 'Defensivo agrícola para controle de pragas', 'ATIVO', 35000.00, 4, 61),
('DESPESA', 'NF-004', '2024-01-15', 'Óleo diesel para maquinário agrícola', 'ATIVO', 15000.00, 7, 63),
('DESPESA', 'NF-005', '2024-01-18', 'Lubrificantes e óleos para tratores', 'ATIVO', 8500.00, 9, 64),
('DESPESA', 'NF-006', '2024-01-22', 'Manutenção de colheitadeira', 'ATIVO', 12000.00, 35, 65),
('DESPESA', 'NF-007', '2024-01-25', 'Peças de reposição para trator', 'ATIVO', 6500.00, 6, 61),
('DESPESA', 'NF-008', '2024-01-28', 'Energia elétrica - Janeiro', 'ATIVO', 4200.00, 16, 62),

-- Fevereiro 2024
('DESPESA', 'NF-009', '2024-02-02', 'Sementes de milho híbrido', 'ATIVO', 38000.00, 3, 63),
('DESPESA', 'NF-010', '2024-02-05', 'Fertilizante fosfatado', 'ATIVO', 52000.00, 2, 64),
('DESPESA', 'NF-011', '2024-02-08', 'Herbicida pós-emergente', 'ATIVO', 28000.00, 4, 65),
('DESPESA', 'NF-012', '2024-02-12', 'Combustível diesel - 5000 litros', 'ATIVO', 18500.00, 8, 61),
('DESPESA', 'NF-013', '2024-02-15', 'Pneus para máquinas agrícolas', 'ATIVO', 22000.00, 38, 62),
('DESPESA', 'NF-014', '2024-02-18', 'Serviço de pulverização aérea', 'ATIVO', 15000.00, 15, 63),
('DESPESA', 'NF-015', '2024-02-22', 'Mão de obra temporária - plantio', 'ATIVO', 25000.00, 13, 64),
('DESPESA', 'NF-016', '2024-02-25', 'Arrendamento de terras', 'ATIVO', 95000.00, 17, 65),

-- Março 2024
('DESPESA', 'NF-017', '2024-03-03', 'Adubo orgânico - 30 toneladas', 'ATIVO', 18000.00, 1, 61),
('DESPESA', 'NF-018', '2024-03-07', 'Calcário agrícola', 'ATIVO', 32000.00, 2, 62),
('DESPESA', 'NF-019', '2024-03-10', 'Inseticida para controle de lagarta', 'ATIVO', 42000.00, 4, 63),
('DESPESA', 'NF-020', '2024-03-14', 'Óleo lubrificante para motores', 'ATIVO', 7200.00, 9, 64),
('DESPESA', 'NF-021', '2024-03-18', 'Manutenção preventiva de equipamentos', 'ATIVO', 18000.00, 35, 65),
('DESPESA', 'NF-022', '2024-03-22', 'Filtros e correias para tratores', 'ATIVO', 4500.00, 6, 61),
('DESPESA', 'NF-023', '2024-03-25', 'Sistema de irrigação automatizado', 'ATIVO', 125000.00, 30, 62),
('DESPESA', 'NF-024', '2024-03-28', 'Energia elétrica - Março', 'ATIVO', 5800.00, 16, 63),

-- Abril 2024
('DESPESA', 'NF-025', '2024-04-02', 'Fertilizante de cobertura', 'ATIVO', 38000.00, 2, 64),
('DESPESA', 'NF-026', '2024-04-05', 'Fungicida preventivo', 'ATIVO', 31000.00, 4, 65),
('DESPESA', 'NF-027', '2024-04-09', 'Combustível para colheita', 'ATIVO', 22000.00, 7, 61),
('DESPESA', 'NF-028', '2024-04-12', 'Frete de insumos agrícolas', 'ATIVO', 8500.00, 12, 62),
('DESPESA', 'NF-029', '2024-04-16', 'Análise de solo - laboratório', 'ATIVO', 3200.00, 28, 63),
('DESPESA', 'NF-030', '2024-04-20', 'Honorários engenheiro agrônomo', 'ATIVO', 8000.00, 23, 64),
('DESPESA', 'NF-031', '2024-04-23', 'Seguro agrícola - safra 2024', 'ATIVO', 45000.00, 20, 65),
('DESPESA', 'NF-032', '2024-04-27', 'Despesas bancárias', 'ATIVO', 1200.00, 24, 61),

-- Maio 2024
('DESPESA', 'NF-033', '2024-05-03', 'Fertilizante potássico', 'ATIVO', 48000.00, 2, 62),
('DESPESA', 'NF-034', '2024-05-07', 'Defensivo para ferrugem', 'ATIVO', 55000.00, 4, 63),
('DESPESA', 'NF-035', '2024-05-10', 'Diesel para máquinas - 8000L', 'ATIVO', 28000.00, 8, 64),
('DESPESA', 'NF-036', '2024-05-14', 'Peças para colheitadeira', 'ATIVO', 35000.00, 6, 65),
('DESPESA', 'NF-037', '2024-05-18', 'Serviço de colheita terceirizada', 'ATIVO', 68000.00, 14, 61),
('DESPESA', 'NF-038', '2024-05-21', 'Transporte de grãos', 'ATIVO', 22000.00, 12, 62),
('DESPESA', 'NF-039', '2024-05-25', 'Armazenagem de produção', 'ATIVO', 18000.00, 11, 63),
('DESPESA', 'NF-040', '2024-05-28', 'Energia elétrica - Maio', 'ATIVO', 6200.00, 16, 64),

-- Junho 2024
('DESPESA', 'NF-041', '2024-06-02', 'Secagem de grãos', 'ATIVO', 32000.00, 11, 65),
('DESPESA', 'NF-042', '2024-06-06', 'Manutenção corretiva trator', 'ATIVO', 15000.00, 36, 61),
('DESPESA', 'NF-043', '2024-06-10', 'Combustível para plantio segunda safra', 'ATIVO', 19000.00, 7, 62),
('DESPESA', 'NF-044', '2024-06-14', 'Sementes de feijão', 'ATIVO', 28000.00, 3, 63),
('DESPESA', 'NF-045', '2024-06-18', 'Fertilizante para segunda safra', 'ATIVO', 42000.00, 2, 64),
('DESPESA', 'NF-046', '2024-06-22', 'ITR - Imposto Territorial Rural', 'ATIVO', 8500.00, 20, 65),
('DESPESA', 'NF-047', '2024-06-25', 'Honorários contábeis', 'ATIVO', 4500.00, 21, 61),
('DESPESA', 'NF-048', '2024-06-28', 'Material hidráulico para irrigação', 'ATIVO', 12000.00, 38, 62),

-- Julho 2024
('DESPESA', 'NF-049', '2024-07-03', 'Defensivo agrícola milho', 'ATIVO', 38000.00, 4, 63),
('DESPESA', 'NF-050', '2024-07-07', 'Óleo diesel - 6000 litros', 'ATIVO', 21000.00, 8, 64),
('DESPESA', 'NF-051', '2024-07-11', 'Ferramentas agrícolas', 'ATIVO', 8500.00, 19, 65),
('DESPESA', 'NF-052', '2024-07-15', 'Pulverização terrestre', 'ATIVO', 12000.00, 13, 61),
('DESPESA', 'NF-053', '2024-07-19', 'Análise fitossanitária', 'ATIVO', 2800.00, 28, 62),
('DESPESA', 'NF-054', '2024-07-23', 'Energia elétrica - Julho', 'ATIVO', 5500.00, 16, 63),
('DESPESA', 'NF-055', '2024-07-27', 'Manutenção sistema irrigação', 'ATIVO', 18000.00, 30, 64),
('DESPESA', 'NF-056', '2024-07-30', 'Aquisição de drone agrícola', 'ATIVO', 85000.00, 31, 65),

-- Agosto 2024
('DESPESA', 'NF-057', '2024-08-03', 'Fertilizante de cobertura milho', 'ATIVO', 35000.00, 2, 61),
('DESPESA', 'NF-058', '2024-08-07', 'Herbicida seletivo', 'ATIVO', 28000.00, 4, 62),
('DESPESA', 'NF-059', '2024-08-11', 'Combustível para equipamentos', 'ATIVO', 16000.00, 7, 63),
('DESPESA', 'NF-060', '2024-08-15', 'Pneus e câmaras tratores', 'ATIVO', 18000.00, 38, 64),
('DESPESA', 'NF-061', '2024-08-19', 'Mão de obra colheita', 'ATIVO', 32000.00, 13, 65),
('DESPESA', 'NF-062', '2024-08-23', 'Frete de produção', 'ATIVO', 25000.00, 12, 61),
('DESPESA', 'NF-063', '2024-08-27', 'Seguro de máquinas', 'ATIVO', 22000.00, 20, 62),
('DESPESA', 'NF-064', '2024-08-30', 'Despesas administrativas', 'ATIVO', 5500.00, 21, 63),

-- Setembro 2024
('DESPESA', 'NF-065', '2024-09-03', 'Colheita mecanizada segunda safra', 'ATIVO', 58000.00, 14, 64),
('DESPESA', 'NF-066', '2024-09-07', 'Armazenagem grãos', 'ATIVO', 22000.00, 11, 65),
('DESPESA', 'NF-067', '2024-09-11', 'Secagem de milho', 'ATIVO', 28000.00, 11, 61),
('DESPESA', 'NF-068', '2024-09-15', 'Energia elétrica - Setembro', 'ATIVO', 7200.00, 16, 62),
('DESPESA', 'NF-069', '2024-09-19', 'Manutenção geral equipamentos', 'ATIVO', 35000.00, 35, 63),
('DESPESA', 'NF-070', '2024-09-23', 'Análises laboratoriais grãos', 'ATIVO', 4200.00, 28, 64),
('DESPESA', 'NF-071', '2024-09-27', 'Consultoria agronômica', 'ATIVO', 12000.00, 23, 65),
('DESPESA', 'NF-072', '2024-09-30', 'Material de construção silos', 'ATIVO', 95000.00, 18, 61),

-- Outubro 2024
('DESPESA', 'NF-073', '2024-10-04', 'Sementes de soja safra 2025', 'ATIVO', 52000.00, 3, 62),
('DESPESA', 'NF-074', '2024-10-08', 'Fertilizante base NPK', 'ATIVO', 78000.00, 2, 63),
('DESPESA', 'NF-075', '2024-10-12', 'Defensivo pré-plantio', 'ATIVO', 42000.00, 4, 64),
('DESPESA', 'NF-076', '2024-10-16', 'Combustível diesel - 7000L', 'ATIVO', 24000.00, 8, 65),
('DESPESA', 'NF-077', '2024-10-20', 'Lubrificantes para safra', 'ATIVO', 9500.00, 9, 61),
('DESPESA', 'NF-078', '2024-10-24', 'Revisão completa tratores', 'ATIVO', 28000.00, 36, 62),
('DESPESA', 'NF-079', '2024-10-28', 'Sistema de geolocalização', 'ATIVO', 15000.00, 33, 63),
('DESPESA', 'NF-080', '2024-10-31', 'IPVA veículos rurais', 'ATIVO', 8200.00, 20, 64),

-- Novembro 2024
('DESPESA', 'NF-081', '2024-11-03', 'Sementes milho safrinha', 'ATIVO', 42000.00, 3, 65),
('DESPESA', 'NF-082', '2024-11-07', 'Calcário dolomítico', 'ATIVO', 35000.00, 2, 61),
('DESPESA', 'NF-083', '2024-11-11', 'Inseticida de solo', 'ATIVO', 38000.00, 4, 62),
('DESPESA', 'NF-084', '2024-11-15', 'Óleo diesel plantio', 'ATIVO', 22000.00, 7, 63),
('DESPESA', 'NF-085', '2024-11-19', 'Peças de reposição geral', 'ATIVO', 18000.00, 6, 64),
('DESPESA', 'NF-086', '2024-11-23', 'Pulverização aérea', 'ATIVO', 16000.00, 15, 65),
('DESPESA', 'NF-087', '2024-11-25', 'Energia elétrica - Novembro', 'ATIVO', 6800.00, 16, 61),
('DESPESA', 'NF-088', '2024-11-28', 'Mão de obra plantio', 'ATIVO', 28000.00, 13, 62),
('DESPESA', 'NF-089', '2024-11-29', 'Honorários advocatícios', 'ATIVO', 12000.00, 22, 63),
('DESPESA', 'NF-090', '2024-11-30', 'Despesas financeiras banco', 'ATIVO', 3500.00, 24, 64);

-- Receitas (30 registros) - Vendas distribuídas em 2024
INSERT INTO movimento_contas (tipo, numeronotafiscal, dataemissao, descricao, status, valortotal, "Pessoas_idFornecedorCliente", "Pessoas_idFaturado") VALUES
-- Vendas ao longo de 2024
('RECEITA', 'NFR-001', '2024-03-15', 'Venda de soja safra 2023/24 - 500 sacas', 'ATIVO', 85000.00, 41, 61),
('RECEITA', 'NFR-002', '2024-03-22', 'Venda de milho - 300 sacas', 'ATIVO', 42000.00, 42, 62),
('RECEITA', 'NFR-003', '2024-04-10', 'Venda de soja para exportação', 'ATIVO', 125000.00, 44, 63),
('RECEITA', 'NFR-004', '2024-04-18', 'Venda de milho para moinho', 'ATIVO', 68000.00, 45, 64),
('RECEITA', 'NFR-005', '2024-05-05', 'Venda de soja cooperativa', 'ATIVO', 95000.00, 41, 65),
('RECEITA', 'NFR-006', '2024-05-12', 'Venda de trigo - 200 sacas', 'ATIVO', 32000.00, 43, 61),
('RECEITA', 'NFR-007', '2024-05-25', 'Venda de soja para indústria', 'ATIVO', 112000.00, 43, 62),
('RECEITA', 'NFR-008', '2024-06-08', 'Venda de milho exportação', 'ATIVO', 78000.00, 44, 63),
('RECEITA', 'NFR-009', '2024-06-15', 'Venda de feijão - 150 sacas', 'ATIVO', 45000.00, 48, 64),
('RECEITA', 'NFR-010', '2024-06-28', 'Venda de soja trading', 'ATIVO', 135000.00, 42, 65),
('RECEITA', 'NFR-011', '2024-07-10', 'Venda de milho para ração', 'ATIVO', 52000.00, 46, 61),
('RECEITA', 'NFR-012', '2024-07-18', 'Venda de soja cooperativa', 'ATIVO', 88000.00, 41, 62),
('RECEITA', 'NFR-013', '2024-08-05', 'Venda de trigo moinho', 'ATIVO', 38000.00, 45, 63),
('RECEITA', 'NFR-014', '2024-08-15', 'Venda de milho cerealista', 'ATIVO', 62000.00, 48, 64),
('RECEITA', 'NFR-015', '2024-08-25', 'Venda de soja exportação', 'ATIVO', 142000.00, 44, 65),
('RECEITA', 'NFR-016', '2024-09-08', 'Venda de feijão distribuidora', 'ATIVO', 48000.00, 49, 61),
('RECEITA', 'NFR-017', '2024-09-18', 'Venda de milho trading', 'ATIVO', 72000.00, 42, 62),
('RECEITA', 'NFR-018', '2024-09-28', 'Venda de soja indústria óleo', 'ATIVO', 118000.00, 47, 63),
('RECEITA', 'NFR-019', '2024-10-10', 'Venda de soja cooperativa', 'ATIVO', 98000.00, 41, 64),
('RECEITA', 'NFR-020', '2024-10-20', 'Venda de milho para ração', 'ATIVO', 58000.00, 46, 65),
('RECEITA', 'NFR-021', '2024-10-28', 'Venda de trigo - 250 sacas', 'ATIVO', 42000.00, 45, 61),
('RECEITA', 'NFR-022', '2024-11-05', 'Venda de soja exportação', 'ATIVO', 152000.00, 44, 62),
('RECEITA', 'NFR-023', '2024-11-12', 'Venda de milho cerealista', 'ATIVO', 65000.00, 48, 63),
('RECEITA', 'NFR-024', '2024-11-18', 'Venda de feijão atacado', 'ATIVO', 52000.00, 55, 64),
('RECEITA', 'NFR-025', '2024-11-22', 'Venda de soja cooperativa', 'ATIVO', 105000.00, 41, 65),
('RECEITA', 'NFR-026', '2024-11-25', 'Venda de milho trading', 'ATIVO', 68000.00, 42, 61),
('RECEITA', 'NFR-027', '2024-11-27', 'Venda de soja indústria', 'ATIVO', 125000.00, 43, 62),
('RECEITA', 'NFR-028', '2024-11-28', 'Venda de trigo moinho', 'ATIVO', 45000.00, 45, 63),
('RECEITA', 'NFR-029', '2024-11-29', 'Venda de milho exportação', 'ATIVO', 82000.00, 44, 64),
('RECEITA', 'NFR-030', '2024-11-30', 'Venda de soja commodity', 'ATIVO', 138000.00, 52, 65);

-- ==========================================
-- RELACIONAR MOVIMENTOS COM CLASSIFICAÇÕES
-- ==========================================

-- Relacionar Despesas com Classificações apropriadas
-- INSUMOS AGRÍCOLAS (idClassificacao = 1)
INSERT INTO "MovimentoContas_has_Classificacao" ("MovimentoContas_idMovimentoContas", "Classificacao_idClassificacao")
SELECT idMovimentoContas, 1 FROM movimento_contas 
WHERE numeronotafiscal IN ('NF-001', 'NF-002', 'NF-003', 'NF-009', 'NF-010', 'NF-011', 'NF-017', 'NF-018', 'NF-019', 'NF-025', 'NF-026', 'NF-033', 'NF-034', 'NF-044', 'NF-045', 'NF-049', 'NF-057', 'NF-058', 'NF-073', 'NF-074', 'NF-075', 'NF-081', 'NF-082', 'NF-083');

-- MANUTENÇÃO E OPERAÇÃO (idClassificacao = 2)
INSERT INTO "MovimentoContas_has_Classificacao" ("MovimentoContas_idMovimentoContas", "Classificacao_idClassificacao")
SELECT idMovimentoContas, 2 FROM movimento_contas 
WHERE numeronotafiscal IN ('NF-004', 'NF-005', 'NF-006', 'NF-007', 'NF-012', 'NF-013', 'NF-020', 'NF-021', 'NF-022', 'NF-027', 'NF-035', 'NF-036', 'NF-042', 'NF-043', 'NF-050', 'NF-051', 'NF-059', 'NF-060', 'NF-076', 'NF-077', 'NF-078', 'NF-084', 'NF-085');

-- RECURSOS HUMANOS (idClassificacao = 3)
INSERT INTO "MovimentoContas_has_Classificacao" ("MovimentoContas_idMovimentoContas", "Classificacao_idClassificacao")
SELECT idMovimentoContas, 3 FROM movimento_contas 
WHERE numeronotafiscal IN ('NF-015', 'NF-061', 'NF-088');

-- SERVIÇOS OPERACIONAIS (idClassificacao = 4)
INSERT INTO "MovimentoContas_has_Classificacao" ("MovimentoContas_idMovimentoContas", "Classificacao_idClassificacao")
SELECT idMovimentoContas, 4 FROM movimento_contas 
WHERE numeronotafiscal IN ('NF-014', 'NF-028', 'NF-037', 'NF-038', 'NF-039', 'NF-041', 'NF-052', 'NF-062', 'NF-065', 'NF-066', 'NF-067', 'NF-086');

-- INFRAESTRUTURA E UTILIDADES (idClassificacao = 5)
INSERT INTO "MovimentoContas_has_Classificacao" ("MovimentoContas_idMovimentoContas", "Classificacao_idClassificacao")
SELECT idMovimentoContas, 5 FROM movimento_contas 
WHERE numeronotafiscal IN ('NF-008', 'NF-016', 'NF-023', 'NF-024', 'NF-040', 'NF-048', 'NF-054', 'NF-055', 'NF-068', 'NF-072', 'NF-087');

-- ADMINISTRATIVAS (idClassificacao = 6)
INSERT INTO "MovimentoContas_has_Classificacao" ("MovimentoContas_idMovimentoContas", "Classificacao_idClassificacao")
SELECT idMovimentoContas, 6 FROM movimento_contas 
WHERE numeronotafiscal IN ('NF-030', 'NF-032', 'NF-047', 'NF-064', 'NF-071', 'NF-089', 'NF-090');

-- SEGUROS E PROTEÇÃO (idClassificacao = 7)
INSERT INTO "MovimentoContas_has_Classificacao" ("MovimentoContas_idMovimentoContas", "Classificacao_idClassificacao")
SELECT idMovimentoContas, 7 FROM movimento_contas 
WHERE numeronotafiscal IN ('NF-031', 'NF-063');

-- IMPOSTOS E TAXAS (idClassificacao = 8)
INSERT INTO "MovimentoContas_has_Classificacao" ("MovimentoContas_idMovimentoContas", "Classificacao_idClassificacao")
SELECT idMovimentoContas, 8 FROM movimento_contas 
WHERE numeronotafiscal IN ('NF-046', 'NF-080');

-- INVESTIMENTOS (idClassificacao = 9)
INSERT INTO "MovimentoContas_has_Classificacao" ("MovimentoContas_idMovimentoContas", "Classificacao_idClassificacao")
SELECT idMovimentoContas, 9 FROM movimento_contas 
WHERE numeronotafiscal IN ('NF-056', 'NF-079');

-- VENDAS (idClassificacao = 11) - Todas as receitas
INSERT INTO "MovimentoContas_has_Classificacao" ("MovimentoContas_idMovimentoContas", "Classificacao_idClassificacao")
SELECT idMovimentoContas, 11 FROM movimento_contas 
WHERE tipo = 'RECEITA';

-- ==========================================
-- ESTATÍSTICAS FINAIS
-- ==========================================
-- Total de pessoas: 80 (40 fornecedores + 20 clientes + 20 faturados)
-- Total de movimentos: 120 (90 despesas + 30 receitas)
-- Total de relacionamentos classificação: ~120

SELECT 'SEED DATA COMPLETO!' as status,
       (SELECT COUNT(*) FROM pessoas) as total_pessoas,
       (SELECT COUNT(*) FROM movimento_contas) as total_movimentos,
       (SELECT COUNT(*) FROM "MovimentoContas_has_Classificacao") as total_classificacoes_vinculadas;

