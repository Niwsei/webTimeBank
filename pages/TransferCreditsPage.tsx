
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import FormField from '../components/FormField';
import { useUser } from '../context/UserContext';
import { useToast } from '../context/ToastContext';
import { ArrowLeftIcon, MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { User } from '../types';

const TransferCreditsPage: React.FC = () => {
    const { currentUser, users, findUserByIdCard, transferCredits } = useUser();
    const { showToast } = useToast();
    const navigate = useNavigate();

    const [idCardSearch, setIdCardSearch] = useState('');
    const [searchedUser, setSearchedUser] = useState<User | null | undefined>(undefined); // undefined for initial, null for not found
    
    const [recipient, setRecipient] = useState<User | null>(null);
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');

    if (!currentUser) {
        return <div>Loading...</div>;
    }

    const familyMembers = users.filter(user => currentUser.family.includes(user.id));

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (idCardSearch.length !== 13 || !/^\d+$/.test(idCardSearch)) {
            setError('Please enter a valid 13-digit ID Card Number.');
            setSearchedUser(null);
            return;
        }
        if (idCardSearch === currentUser.idCardNumber) {
            setError("You cannot transfer credits to yourself.");
            setSearchedUser(null);
            return;
        }
        const foundUser = findUserByIdCard(idCardSearch);
        setSearchedUser(foundUser || null);
    };

    const selectRecipient = (user: User) => {
        setRecipient(user);
        setSearchedUser(undefined);
        setIdCardSearch('');
        setError('');
    };
    
    const clearRecipient = () => {
        setRecipient(null);
        setAmount('');
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!recipient) return;
        
        const transferAmount = parseInt(amount);

        if (isNaN(transferAmount) || transferAmount <= 0) {
            showToast('Please enter a valid amount.', 'error');
            return;
        }
        if (transferAmount > currentUser.timeCredit) {
            showToast("You don't have enough credits for this transfer.", 'error');
            return;
        }
        
        const result = transferCredits(recipient.id, transferAmount);
        
        if (result.success) {
            showToast(`Successfully transferred ${amount} credits to ${recipient.name}!`, 'success');
            navigate('/timebank');
        } else {
            showToast(result.message, 'error');
        }
    };

    return (
        <div className="max-w-4xl mx-auto font-prompt">
            <Link to="/timebank" className="inline-flex items-center text-secondary-text hover:text-accent mb-6 transition-colors">
                <ArrowLeftIcon className="w-5 h-5 mr-2" />
                Back to Time Bank
            </Link>
            <h1 className="text-3xl font-bold text-primary-text mb-2">Transfer Time Credits</h1>
            <p className="text-secondary-text mb-6">You can only transfer credits to family members. Find them by ID Card Number to add them.</p>
            
            <div className="bg-surface p-6 sm:p-8 rounded-xl shadow-md border border-border-color space-y-8">
                <div className="text-center bg-accent-light p-4 rounded-lg">
                    <p className="text-secondary-text font-medium">Your available balance</p>
                    <p className="text-3xl font-bold text-accent">{currentUser.timeCredit} Credits</p>
                </div>

                {!recipient ? (
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Family Members */}
                        <div>
                            <h2 className="text-xl font-semibold mb-3">Family Members</h2>
                            <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                                {familyMembers.length > 0 ? familyMembers.map(member => (
                                    <div key={member.id} className="flex items-center justify-between p-3 bg-background rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <img src={member.avatarUrl} alt={member.name} className="w-10 h-10 rounded-full" />
                                            <span className="font-semibold text-primary-text">{member.name}</span>
                                        </div>
                                        <button onClick={() => selectRecipient(member)} className="px-3 py-1 bg-accent text-white font-bold text-sm rounded-md hover:bg-accent-hover">Select</button>
                                    </div>
                                )) : <p className="text-secondary-text text-sm p-3 bg-background rounded-lg">No family members added yet.</p>}
                            </div>
                        </div>

                        {/* Search */}
                        <div>
                           <h2 className="text-xl font-semibold mb-3">Find by ID Card Number</h2>
                           <form onSubmit={handleSearch} className="flex items-start space-x-2">
                                <div className="flex-grow">
                                    <input 
                                        type="text"
                                        placeholder="13-digit ID Card Number"
                                        value={idCardSearch}
                                        onChange={(e) => setIdCardSearch(e.target.value)}
                                        maxLength={13}
                                        className="w-full px-4 py-3 bg-background border border-border-color rounded-lg text-primary-text placeholder-secondary-text focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                                    />
                                     {error && <p className="text-red-500 text-sm mt-1.5">{error}</p>}
                                </div>
                                <button type="submit" className="p-3 bg-accent text-white rounded-lg hover:bg-accent-hover"><MagnifyingGlassIcon className="w-6 h-6"/></button>
                           </form>
                           {searchedUser && (
                                <div className="mt-4 p-3 bg-background rounded-lg flex items-center justify-between animate-subtle-enter">
                                    <div className="flex items-center space-x-3">
                                        <img src={searchedUser.avatarUrl} alt={searchedUser.name} className="w-10 h-10 rounded-full" />
                                        <span className="font-semibold text-primary-text">{searchedUser.name}</span>
                                    </div>
                                    <button onClick={() => selectRecipient(searchedUser)} className="px-3 py-1 bg-accent text-white font-bold text-sm rounded-md hover:bg-accent-hover">Select</button>
                                </div>
                           )}
                           {searchedUser === null && <p className="text-secondary-text text-sm mt-2 p-3 bg-background rounded-lg">User not found.</p>}
                        </div>
                    </div>
                ) : (
                    <div className="animate-subtle-enter">
                         <h2 className="text-xl font-semibold mb-3">Transfer Details</h2>
                         <div className="bg-background p-4 rounded-lg mb-6 flex items-center justify-between">
                            <div>
                                <p className="text-sm text-secondary-text">Recipient:</p>
                                <div className="flex items-center space-x-3 mt-1">
                                    <img src={recipient.avatarUrl} alt={recipient.name} className="w-10 h-10 rounded-full" />
                                    <span className="font-bold text-lg text-primary-text">{recipient.name}</span>
                                </div>
                            </div>
                            <button onClick={clearRecipient} className="text-sm font-semibold text-accent hover:underline">Change</button>
                         </div>
                         <form onSubmit={handleSubmit} className="space-y-4">
                             <FormField
                                label="Amount to Transfer"
                                name="amount"
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                                placeholder="e.g., 5"
                            />
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    className="w-full py-3 bg-accent text-white font-bold text-lg rounded-md hover:bg-accent-hover transition-all duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed transform active:scale-95 shadow-lg shadow-accent/20"
                                >
                                    Confirm & Transfer {amount && `${amount} Credits`}
                                </button>
                            </div>
                         </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TransferCreditsPage;
