import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/UserNav";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink } from "lucide-react";

const Recursos = () => {
  const { profile } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow pt-20 pb-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Recursos Financeiros</h1>
              <p className="text-gray-600">Olá, {profile?.nome || "Estudante"}! Conheça opções para ampliar sua renda e boas práticas financeiras.</p>
            </div>
            <div className="mt-4 lg:mt-0">
              <UserNav />
            </div>
          </div>

          <Tabs defaultValue="auxilio" className="mb-8">
            <TabsList className="mb-8">
              <TabsTrigger value="auxilio">Auxílios Estudantis</TabsTrigger>
              <TabsTrigger value="bolsas">Bolsas e Programas</TabsTrigger>
              <TabsTrigger value="praticas">Boas Práticas</TabsTrigger>
            </TabsList>
            
            <TabsContent value="auxilio" className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <h2 className="text-2xl font-bold mb-4">Auxílios Estudantis Disponíveis</h2>
                <p className="text-gray-600 mb-4">
                  Os auxílios estudantis são apoios financeiros oferecidos por instituições de ensino e governos 
                  para garantir que estudantes em situação de vulnerabilidade socioeconômica possam continuar seus estudos.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Auxílio Permanência</CardTitle>
                    <CardDescription>Programa do SEDUC-PI</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Oferece um valor mensal para estudantes de baixa renda matriculados na rede estadual de ensino, 
                      visando garantir sua permanência na escola.
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-sm mb-4">
                      <li>Valor: R$ 200,00 mensais</li>
                      <li>Requisitos: Estar matriculado na rede estadual</li>
                      <li>Inscrição: Início do ano letivo</li>
                    </ul>
                    <Button className="w-full" variant="outline">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      <span>Saiba mais</span>
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Bolsa Família</CardTitle>
                    <CardDescription>Programa Federal</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Programa de transferência direta de renda para famílias em situação de pobreza e extrema pobreza, 
                      com foco na saúde e educação.
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-sm mb-4">
                      <li>Valor: Variável conforme composição familiar</li>
                      <li>Requisitos: Cadastro no CadÚnico</li>
                      <li>Frequência escolar mínima: 85%</li>
                    </ul>
                    <Button className="w-full" variant="outline">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      <span>Saiba mais</span>
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Auxílio Material Escolar</CardTitle>
                    <CardDescription>Programa Estadual</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Oferece auxílio financeiro no início do ano letivo para aquisição de material escolar 
                      para estudantes da rede pública estadual.
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-sm mb-4">
                      <li>Valor: Pagamento único de R$ 150,00</li>
                      <li>Período: Início de cada ano letivo</li>
                      <li>Forma de solicitação: Na secretaria da escola</li>
                    </ul>
                    <Button className="w-full" variant="outline">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      <span>Saiba mais</span>
                    </Button>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Como Solicitar Auxílios</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="list-decimal list-inside space-y-4">
                    <li className="text-gray-800">
                      <span className="font-medium">Verifique os requisitos:</span>
                      <p className="ml-6 mt-1 text-gray-600">
                        Cada programa tem critérios específicos. Geralmente incluem comprovação de matrícula, 
                        renda familiar e documentos pessoais.
                      </p>
                    </li>
                    <li className="text-gray-800">
                      <span className="font-medium">Prepare a documentação:</span>
                      <p className="ml-6 mt-1 text-gray-600">
                        Reúna documentos como RG, CPF, comprovante de residência, comprovante de matrícula 
                        e comprovantes de renda familiar.
                      </p>
                    </li>
                    <li className="text-gray-800">
                      <span className="font-medium">Acompanhe os prazos:</span>
                      <p className="ml-6 mt-1 text-gray-600">
                        Fique atento aos períodos de inscrição e renovação dos auxílios.
                        A escola costuma divulgar essas informações nos murais ou nas redes sociais.
                      </p>
                    </li>
                    <li className="text-gray-800">
                      <span className="font-medium">Procure o setor responsável:</span>
                      <p className="ml-6 mt-1 text-gray-600">
                        Na sua escola, procure a secretaria ou coordenação pedagógica. Eles poderão 
                        orientar sobre os processos e formulários necessários.
                      </p>
                    </li>
                  </ol>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="bolsas" className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <h2 className="text-2xl font-bold mb-4">Bolsas e Programas de Incentivo</h2>
                <p className="text-gray-600 mb-4">
                  Além dos auxílios regulares, existem diversos programas de bolsas e incentivos para 
                  estudantes que desejam desenvolver habilidades específicas ou que se destacam em certas áreas.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Jovem Cientista</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Programa que incentiva estudantes do ensino médio a desenvolverem projetos científicos, 
                      oferecendo bolsas para os selecionados.
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-sm mb-4">
                      <li>Valor: R$ 300,00 mensais por 10 meses</li>
                      <li>Requisitos: Proposta de projeto + professor orientador</li>
                      <li>Inscrições: Geralmente no primeiro semestre</li>
                    </ul>
                    <Button className="w-full" variant="outline">Detalhes do programa</Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Olimpíadas de Conhecimento</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Participantes com bom desempenho em olimpíadas como OBMEP (Matemática), 
                      OBA (Astronomia) e outras podem receber bolsas de incentivo.
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-sm mb-4">
                      <li>OBMEP: Até R$ 350,00 mensais para medalhistas</li>
                      <li>Diversas olimpíadas com premiações próprias</li>
                      <li>Inclui mentorias e programas especiais</li>
                    </ul>
                    <Button className="w-full" variant="outline">Ver calendário de olimpíadas</Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Jovem Empreendedor</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Programa que estimula o empreendedorismo entre jovens estudantes, 
                      oferecendo mentorias e capital semente para ideias inovadoras.
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-sm mb-4">
                      <li>Capital semente: Até R$ 1.000,00 para projetos selecionados</li>
                      <li>Inclui workshops e mentorias</li>
                      <li>Aberto para estudantes do ensino médio</li>
                    </ul>
                    <Button className="w-full" variant="outline">Como participar</Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Monitoria Escolar</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Estudantes com bom desempenho acadêmico podem se tornar monitores 
                      em disciplinas específicas, recebendo uma bolsa mensal.
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-sm mb-4">
                      <li>Valor: R$ 150,00 mensais</li>
                      <li>Carga horária: 8 horas semanais</li>
                      <li>Seleção: Análise de histórico + entrevista</li>
                    </ul>
                    <Button className="w-full" variant="outline">Processo seletivo</Button>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Preparação para Bolsas Universitárias</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Pensando no futuro, conheça alguns programas de bolsas universitárias 
                    para os quais você pode se preparar enquanto está no ensino médio:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-2">PROUNI</h3>
                      <p className="text-sm text-gray-600">
                        Oferece bolsas integrais ou parciais em instituições privadas para 
                        estudantes de baixa renda com base na nota do ENEM.
                      </p>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-2">FIES</h3>
                      <p className="text-sm text-gray-600">
                        Financiamento estudantil com condições especiais para cursos de graduação 
                        em instituições privadas.
                      </p>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-2">Bolsas de Instituições</h3>
                      <p className="text-sm text-gray-600">
                        Muitas universidades oferecem programas próprios de bolsas por mérito 
                        acadêmico, esportivo ou necessidade socioeconômica.
                      </p>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-2">Programas Internacionais</h3>
                      <p className="text-sm text-gray-600">
                        Existem programas como Jovens Embaixadores e outros intercâmbios 
                        que podem ser acessados ainda durante o ensino médio.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="praticas" className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <h2 className="text-2xl font-bold mb-4">Boas Práticas Financeiras</h2>
                <p className="text-gray-600 mb-4">
                  Aprenda a utilizar seus recursos financeiros de maneira consciente e eficiente, 
                  desenvolvendo hábitos que irão beneficiar toda sua vida financeira futura.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary mr-3">
                        <span className="font-bold">1</span>
                      </div>
                      Priorize Necessidades
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Antes de gastar seu dinheiro, identifique o que é realmente necessário 
                      e o que é apenas um desejo. Faça suas compras com consciência.
                    </p>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h4 className="font-medium mb-2">Dica prática:</h4>
                      <p className="text-sm text-gray-600">
                        Antes de comprar algo, espere 24 horas para decidir se realmente precisa daquele item. 
                        Muitas vezes, o impulso de compra passa após esse período.
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary mr-3">
                        <span className="font-bold">2</span>
                      </div>
                      Registre Seus Gastos
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Anote tudo o que você gasta, por menor que seja o valor. Isso te dará uma 
                      visão clara de para onde seu dinheiro está indo.
                    </p>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h4 className="font-medium mb-2">Dica prática:</h4>
                      <p className="text-sm text-gray-600">
                        Use o app FinAI para registrar seus gastos diariamente. Estabeleça um horário fixo 
                        do dia para fazer esse registro, tornando-o um hábito.
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary mr-3">
                        <span className="font-bold">3</span>
                      </div>
                      Economize Regularmente
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Separe uma parte de todo dinheiro que você recebe para economizar. 
                      O ideal é guardar pelo menos 20% da sua renda.
                    </p>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h4 className="font-medium mb-2">Dica prática:</h4>
                      <p className="text-sm text-gray-600">
                        Assim que receber qualquer valor, imediatamente separe a parte destinada à poupança. 
                        Use a regra 50/30/20: 50% para necessidades, 30% para desejos e 20% para poupar.
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary mr-3">
                        <span className="font-bold">4</span>
                      </div>
                      Defina Metas Claras
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Estabeleça objetivos financeiros específicos, como comprar um notebook 
                      ou economizar para um curso. Isso te motivará a economizar.
                    </p>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h4 className="font-medium mb-2">Dica prática:</h4>
                      <p className="text-sm text-gray-600">
                        Use o recurso de "Metas" no FinAI. Visualize seu progresso frequentemente e 
                        celebre cada marco alcançado no caminho para sua meta final.
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary mr-3">
                        <span className="font-bold">5</span>
                      </div>
                      Compare Preços
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Antes de comprar algo, pesquise em diferentes locais para encontrar 
                      o melhor preço e condições. Cada centavo economizado conta!
                    </p>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h4 className="font-medium mb-2">Dica prática:</h4>
                      <p className="text-sm text-gray-600">
                        Para compras maiores, liste pelo menos três locais diferentes onde você 
                        pode adquirir o produto e compare não só o preço, mas também qualidade e garantia.
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary mr-3">
                        <span className="font-bold">6</span>
                      </div>
                      Evite Dívidas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Não gaste mais do que você tem. Evite empréstimos e compras parceladas 
                      sempre que possível, especialmente para itens não essenciais.
                    </p>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <h4 className="font-medium mb-2">Dica prática:</h4>
                      <p className="text-sm text-gray-600">
                        Se precisar comprar algo mais caro, economize primeiro e compre à vista. 
                        Assim você poderá negociar descontos e evitar juros.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Economizando no Dia a Dia</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-2">Na Alimentação</h3>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                        <li>Leve lanches de casa em vez de comprar na cantina</li>
                        <li>Opte por água em vez de refrigerantes ou sucos industrializados</li>
                        <li>Planeje refeições com antecedência para evitar gastos impulsivos</li>
                      </ul>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-2">No Transporte</h3>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                        <li>Utilize o transporte escolar gratuito quando disponível</li>
                        <li>Considere ir a pé ou de bicicleta para lugares próximos</li>
                        <li>Verifique se há desconto estudantil no transporte público</li>
                      </ul>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-2">Em Material Escolar</h3>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                        <li>Reutilize materiais do ano anterior que estejam em bom estado</li>
                        <li>Compare preços em diferentes papelarias</li>
                        <li>Participe de feiras de troca de livros e materiais</li>
                      </ul>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-2">No Lazer</h3>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                        <li>Busque atividades gratuitas ou com desconto para estudantes</li>
                        <li>Aproveite bibliotecas públicas para livros e filmes</li>
                        <li>Organize encontros em casa com amigos em vez de sair</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Recursos;
