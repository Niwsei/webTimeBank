
import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { Transaction } from '../types';
import { ArrowUpRightIcon, ArrowDownLeftIcon, ArrowsRightLeftIcon } from '@heroicons/react/24/solid';

// Mock transaction data
const mockTransactions: Transaction[] = [
  { id: 1, type: 'deposit', description: 'Helped with gardening', amount: 2, date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
  { id: 2, type: 'withdrawal', description: 'Received help with bike repair', amount: 1, date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() },
  { id: 3, type: 'transfer-out', description: 'Sent to สมชาย', amount: 5, date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), to: 'สมชาย' },
  { id: 4, type: 'deposit', description: 'Taught basic thai cooking', amount: 3, date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() },
  { id: 5, type: 'transfer-in', description: 'Received from มานี', amount: 10, date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(), from: 'มานี' },
];

const TransactionIcon: React.FC<{ type: Transaction['type'] }> = ({ type }) => {
    const baseClasses = 'w-6 h-6 p-2 rounded-full';
    switch (type) {
        case 'deposit':
        case 'transfer-in':
            return <ArrowDownLeftIcon className={`${baseClasses} bg-green-100 text-green-600`} />;
        case 'withdrawal':
        case 'transfer-out':
            return <ArrowUpRightIcon className={`${baseClasses} bg-red-100 text-red-600`} />;
        default:
            return null;
    }
};

const TimeBankPage: React.FC = () => {
  const { currentUser } = useUser();
  
  if (!currentUser) {
    // In a real app with skeletons, we would show a skeleton here.
    return <div>Loading...</div>;
  }

  return (
    <div className="font-prompt space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary-text font-prompt">My Time Bank</h1>
        <p className="text-secondary-text">View your credit balance and transaction history.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Balance Card */}
        <div className="lg:col-span-1 bg-surface border border-border-color rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center text-center">
            <p className="text-secondary-text font-medium">Your Current Balance</p>
            <p className="text-6xl font-bold text-accent my-3">{currentUser.timeCredit}</p>
            <p className="text-sm font-semibold text-secondary-text bg-accent-light px-3 py-1 rounded-full inline-block">Time Credits</p>
            <Link to="/timebank/transfer" className="mt-6 w-full flex items-center justify-center px-4 py-3 bg-accent text-white font-bold rounded-lg hover:bg-accent-hover transition-colors shadow-lg shadow-accent/20">
                <ArrowsRightLeftIcon className="w-5 h-5 mr-2" />
                Transfer Credits
            </Link>
        </div>
        
        {/* Transaction History */}
        <div className="lg:col-span-2 bg-surface border border-border-color rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-primary-text mb-4">Recent Transactions</h2>
            <div className="space-y-3">
                {mockTransactions.length > 0 ? mockTransactions.map(tx => (
                    <div key={tx.id} className="flex items-center justify-between p-3 bg-background rounded-lg">
                        <div className="flex items-center space-x-4">
                            <TransactionIcon type={tx.type} />
                            <div>
                                <p className="font-semibold text-primary-text">{tx.description}</p>
                                <p className="text-sm text-secondary-text">{new Date(tx.date).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                            </div>
                        </div>
                        <p className={`font-bold text-lg ${['deposit', 'transfer-in'].includes(tx.type) ? 'text-green-600' : 'text-red-600'}`}>
                            {['deposit', 'transfer-in'].includes(tx.type) ? '+' : '-'}{tx.amount}
                        </p>
                    </div>
                )) : (
                    <p className="text-secondary-text text-center py-4">No transactions yet.</p>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default TimeBankPage;
