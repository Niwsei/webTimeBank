
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, CheckCircleIcon, ClockIcon, UserGroupIcon } from '@heroicons/react/24/solid';
import FormTextArea from '../components/FormTextArea';
import { Comment, UserStub } from '../types';
import { useData } from '../context/DataContext';
import { useUser } from '../context/UserContext';
import { useToast } from '../context/ToastContext';

const StatusBadge: React.FC<{ status: 'open' | 'in_progress' | 'completed' }> = ({ status }) => {
    const baseClasses = "text-xs font-bold px-3 py-1 rounded-full inline-block";
    if (status === 'open') {
        return <span className={`${baseClasses} bg-blue-100 text-blue-700`}>Open for Help</span>;
    }
    if (status === 'in_progress') {
        return <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>In Progress</span>;
    }
    if (status === 'completed') {
        return <span className={`${baseClasses} bg-green-100 text-green-700`}>Completed</span>;
    }
    return null;
};


const RequestDetailPage: React.FC = () => {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const { requests, addCommentToRequest, addReactionToRequest, applyToRequest, selectProvider, completeRequest } = useData();
  const { currentUser, processJobPayment } = useUser();
  const { showToast } = useToast();
  const request = requests.find(r => r.id === parseInt(requestId || ''));
  
  const [newComment, setNewComment] = useState('');

  if (!request) {
    return <div className="text-center text-secondary-text">Request not found.</div>;
  }
  
  if (!currentUser) {
      // Should be handled by AuthenticatedLayout, but as a fallback
      return <div className="text-center text-secondary-text">Please log in to view details.</div>;
  }
  
  const isOwner = currentUser.id === request.user.id;
  const isApplicant = request.applicants.some(a => a.id === currentUser.id);
  const isProvider = currentUser.id === request.selectedProvider?.id;
  const canApply = !isOwner && !isApplicant && !isProvider && request.status === 'open';

  const handleReactionClick = (emoji: string) => {
    addReactionToRequest(request.id, emoji);
  };
  
  const handleCommentSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if(newComment.trim() && currentUser){
          const userStub: UserStub = { 
            id: currentUser.id,
            name: `${currentUser.firstName} ${currentUser.lastName}`, 
            avatarUrl: currentUser.avatarUrl || `https://i.pravatar.cc/150?u=${currentUser.email}` 
          };
          addCommentToRequest(request.id, { text: newComment, user: userStub });
          setNewComment('');
      }
  }

  const handleApply = () => {
      const applicant: UserStub = {
          id: currentUser.id,
          name: `${currentUser.firstName} ${currentUser.lastName}`,
          avatarUrl: currentUser.avatarUrl || `https://i.pravatar.cc/150?u=${currentUser.email}`
      };
      applyToRequest(request.id, applicant);
  };

  const handleSelectProvider = (provider: UserStub) => {
      selectProvider(request.id, provider);
  };

  const handleComplete = () => {
      if (!request.selectedProvider) return;
      completeRequest(request.id);
      processJobPayment(request.user.id, request.selectedProvider.id, request.duration, request.title);
      showToast('Task completed and credits transferred!', 'success');
      navigate('/dashboard');
  };

  return (
    <div className="max-w-3xl mx-auto font-prompt">
      <Link to="/search" className="inline-flex items-center text-secondary-text hover:text-accent mb-6 transition-colors">
        <ArrowLeftIcon className="w-5 h-5 mr-2" />
        Back to Search
      </Link>
      
      <div className="bg-surface p-6 sm:p-8 rounded-2xl shadow-md border border-border-color">
        <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4 mb-4">
                <img src={request.user.avatarUrl} alt={request.user.name} className="w-14 h-14 rounded-full object-cover flex-shrink-0" />
                <div>
                    <span className="bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">{request.category}</span>
                    <h1 className="text-2xl sm:text-3xl font-bold text-primary-text mt-2">{request.title}</h1>
                    <p className="text-secondary-text">Posted by {request.user.name}</p>
                </div>
            </div>
            <StatusBadge status={request.status} />
        </div>
        
        <div className="flex items-center space-x-4 text-secondary-text my-4 border-y border-border-color py-3">
            <div className="flex items-center"><ClockIcon className="w-5 h-5 mr-1.5" /> {request.duration} {request.unit}</div>
            <div className="flex items-center"><UserGroupIcon className="w-5 h-5 mr-1.5" /> {request.applicants.length} applicant(s)</div>
        </div>

        <p className="text-primary-text text-base leading-relaxed my-6">{request.description}</p>
        
        {/* ACTION BUTTONS / STATUS INFO */}
        {canApply && (
            <div className="my-6">
                <button onClick={handleApply} className="w-full py-3 bg-accent text-white font-bold text-lg rounded-md hover:bg-accent-hover transition-colors shadow-lg shadow-accent/20">
                    I can help! (+{request.duration} TC)
                </button>
            </div>
        )}
        {request.status === 'in_progress' && (isOwner || isProvider) && (
            <div className="my-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
                <h3 className="font-bold text-blue-800">Task in Progress</h3>
                <p className="text-blue-700">This task is being handled by {request.selectedProvider?.name}. Once finished, the requester can mark it as complete.</p>
                {isOwner && (
                    <button onClick={handleComplete} className="mt-3 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
                        Mark as Complete
                    </button>
                )}
            </div>
        )}
        {request.status === 'completed' && (
             <div className="my-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg text-green-800 flex items-center space-x-3">
                <CheckCircleIcon className="w-8 h-8"/>
                <div>
                    <h3 className="font-bold">Task Completed!</h3>
                    <p>{request.duration} Time Credits were transferred to {request.selectedProvider?.name}.</p>
                </div>
            </div>
        )}

        {/* APPLICANT LIST (for owner) */}
        {isOwner && request.status === 'open' && request.applicants.length > 0 && (
            <div className="my-6 border-t border-border-color pt-6">
                 <h2 className="text-xl font-semibold text-primary-text mb-4">Applicants</h2>
                 <div className="space-y-3">
                    {request.applicants.map(applicant => (
                        <div key={applicant.id} className="flex items-center justify-between p-3 bg-background rounded-lg">
                            <div className="flex items-center space-x-3">
                                <img src={applicant.avatarUrl} alt={applicant.name} className="w-10 h-10 rounded-full" />
                                <span className="font-semibold text-primary-text">{applicant.name}</span>
                            </div>
                            <button onClick={() => handleSelectProvider(applicant)} className="px-4 py-1.5 bg-green-600 text-white font-bold text-sm rounded-md hover:bg-green-700">Select</button>
                        </div>
                    ))}
                 </div>
            </div>
        )}

        <div className="flex items-center space-x-2 border-t border-border-color pt-6">
            {['👍', '❤️', '🙏'].map(emoji => (
                <button 
                    key={emoji}
                    onClick={() => handleReactionClick(emoji)}
                    className="flex items-center space-x-1.5 px-3 py-1.5 bg-background hover:bg-muted border border-border-color rounded-full transition-colors"
                >
                    <span>{emoji}</span>
                    <span className="font-bold text-sm text-primary-text">{request.reactions[emoji] || 0}</span>
                </button>
            ))}
        </div>

        {/* Comments Section */}
        <div className="mt-6">
            <h2 className="text-xl font-semibold text-primary-text mb-4">Community Discussion ({request.comments.length})</h2>

            <form onSubmit={handleCommentSubmit} className="mb-6">
                <FormTextArea 
                    label=""
                    name="comment"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Offer help or ask a question..."
                    rows={3}
                />
                <button type="submit" disabled={!newComment.trim()} className="mt-2 px-5 py-2 bg-accent text-white font-bold rounded-md hover:bg-accent-hover disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors">Post Comment</button>
            </form>

            <ul className="space-y-4">
                {request.comments.map(comment => (
                    <li key={comment.id} className="flex items-start space-x-3">
                        <img src={comment.user.avatarUrl} alt={comment.user.name} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                        <div className="bg-background p-3 rounded-lg flex-1">
                            <p className="font-bold text-sm text-primary-text">{comment.user.name}</p>
                            <p className="text-secondary-text">{comment.text}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
      </div>
    </div>
  );
};

export default RequestDetailPage;
