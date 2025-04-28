
interface Transaction {
  id: string;
  descricao: string;
  valor: number;
  tipo: string;
  categoria: string;
  data_transacao: string;
}

interface TransactionsTableProps {
  transactions: Transaction[];
}

export const TransactionsTable = ({ transactions }: TransactionsTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Descrição
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Valor
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Tipo
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Categoria
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Data
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{transaction.descricao}</p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">R$ {transaction.valor.toFixed(2)}</p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{transaction.tipo}</p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{transaction.categoria}</p>
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <p className="text-gray-900 whitespace-no-wrap">{transaction.data_transacao}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
