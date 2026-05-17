import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';
import { toast } from 'react-toastify';

// ─────────────────────────────────────────────
// REUSABLE CHILD COMPONENT: UserCard
// ─────────────────────────────────────────────
const UserCard = ({ user }) => {
  const { requestSkillSwap, requests } = useAuth();
  
  // Check if a request has already been sent to THIS user
  const isAlreadySent = requests.some(req => req.to === user.name && req.status === 'pending');
  const [requestSent, setRequestSent] = useState(isAlreadySent);

  const handleConnect = () => {
    // 💰 COIN LOCKING LOGIC
    // This will check balance, deduct 50 coins, and create the request
    const result = requestSkillSwap(user);

    if (result.success) {
      setRequestSent(true);
      toast.success(`50 Coins locked! Request sent to ${user.name} 🚀`);
    } else {
      toast.error(result.message || "Failed to send request");
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur-md border border-white/40 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 group">
      <div className="flex items-center gap-4 mb-5">
        <img
          src={user.avatar || `https://api.dicebear.com/8.x/adventurer/svg?seed=${user.name}`}
          alt={user.name}
          className="w-16 h-16 rounded-full border-4 border-indigo-200 object-cover shadow-sm"
        />
        <div>
          <h3 className="text-xl font-bold text-gray-800">{user.name}</h3>
          <p className="text-indigo-600 text-sm font-medium">{user.experience} Level</p>
          <p className="text-gray-400 text-xs">📍 {user.location}</p>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-5 leading-relaxed italic">
        "{user.bio}"
      </p>

      {/* Skills Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-2">Can Teach</p>
          <div className="flex flex-wrap gap-1">
            {user.skillsOffered.map((skill) => (
              <span key={skill} className="bg-indigo-50 text-indigo-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-indigo-100">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[10px] font-bold text-purple-500 uppercase tracking-widest mb-2">Wants to Learn</p>
          <div className="flex flex-wrap gap-1">
            {user.skillsWanted.map((skill) => (
              <span key={skill} className="bg-purple-50 text-purple-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-purple-100">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={handleConnect}
        disabled={requestSent}
        className={`w-full py-3 rounded-2xl font-bold text-sm transition-all duration-300 ${
          requestSent
            ? 'bg-emerald-100 text-emerald-700 cursor-not-allowed shadow-inner'
            : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5'
        }`}
      >
        {requestSent ? '✅ Connection Request Sent' : '🤝 Send Connection Request'}
      </button>
    </div>
  );
};

// ─────────────────────────────────────────────
// REUSABLE CHILD COMPONENT: ResourceCard
// ─────────────────────────────────────────────
const ResourceCard = ({ resource }) => {
  const { rateResource } = useAuth();
  const [hoverRating, setHoverRating] = useState(0);

  const handleRate = (stars) => {
    rateResource(resource.id, stars);
  };

  return (
    <div className="bg-white/70 backdrop-blur-md border border-white/40 rounded-[2.5rem] p-6 shadow-lg hover:shadow-2xl transition-all duration-300 group flex flex-col h-full relative overflow-hidden">
      
      {/* 🏆 REWARD BADGE */}
      {resource.rewardsEarned?.includes('quality_bonus') && (
        <div className="absolute -left-12 top-6 -rotate-45 bg-amber-500 text-white py-1.5 px-12 text-[8px] font-black uppercase tracking-widest shadow-lg z-20 animate-bounce">
          Quality Pick 🏆
        </div>
      )}

      <div className="relative aspect-video rounded-3xl overflow-hidden mb-6 bg-gray-100 shadow-inner">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
          <span className="text-4xl group-hover:scale-125 transition-transform duration-500">📺</span>
        </div>
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-indigo-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
          {resource.category}
        </div>
      </div>

      <h3 className="text-lg font-black text-gray-800 mb-2 leading-tight">{resource.title}</h3>
      <p className="text-xs text-gray-500 mb-6 flex-1 line-clamp-2 italic">"{resource.description}"</p>

      {/* ⭐ INTERACTIVE RATING */}
      <div className="mb-6 p-3 bg-white/50 rounded-2xl border border-white/50">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Rate this lesson</p>
          <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
            {resource.ratingCount || 0} Ratings
          </span>
        </div>
        <div className="flex gap-1.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => handleRate(star)}
              className={`text-xl transition-all duration-200 transform hover:scale-125 ${
                (hoverRating || resource.rating) >= star ? 'grayscale-0' : 'grayscale opacity-30'
              }`}
            >
              ⭐
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
        <div className="flex flex-col">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Shared By</p>
          <p className="text-xs font-black text-indigo-600">{resource.uploader}</p>
        </div>
        <div className="flex items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded-full">
          <span className="text-xs font-black text-amber-700">⭐ {resource.rating || '0.0'}</span>
        </div>
      </div>

      <a 
        href={resource.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="w-full mt-6 py-3 bg-gray-900 text-white rounded-2xl font-bold text-xs text-center hover:bg-indigo-600 transition-all shadow-lg active:scale-95"
      >
        Open Resource ↗
      </a>
    </div>
  );
};

// ─────────────────────────────────────────────
// MAIN PAGE COMPONENT: FindSkills
// ─────────────────────────────────────────────
const FindSkills = () => {
  const { user, resources } = useAuth();
  const [allUsers, setAllUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get('query');

  // ─────────────────────────────────────────────
  // 🔄 DYNAMIC USER FETCHING
  // ─────────────────────────────────────────────
  useEffect(() => {
    setIsLoading(true);
    
    // 1. Fetch real registered users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
    
    // 2. Convert object { email: userObj } into an array [userObj, userObj]
    const usersList = Object.values(storedUsers);
    
    // 3. Exclude the currently logged-in user from search results
    const otherUsers = usersList.filter(u => u.email !== user?.email);
    
    setAllUsers(otherUsers);
    
    if (queryParam) setSearchTerm(queryParam);
    
    setTimeout(() => setIsLoading(false), 600);
  }, [user?.email, queryParam]);

  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedSkill, setSelectedSkill] = useState('All');

  // Derive unique list of all skills offered by real users
  const allAvailableSkills = ['All', ...new Set(allUsers.flatMap(u => u.skillsOffered || []))];

  // 🔍 REAL-TIME FILTERING LOGIC
  const filteredUsers = allUsers.filter((u) => {
    const searchLower = searchTerm.toLowerCase();
    
    // Check if name or any skill matches the search term
    const nameMatch = u.name?.toLowerCase().includes(searchLower);
    const skillsOfferedMatch = u.skillsOffered?.some(s => s.toLowerCase().includes(searchLower));
    const skillsWantedMatch = u.skillsWanted?.some(s => s.toLowerCase().includes(searchLower));
    
    const matchesSearch = nameMatch || skillsOfferedMatch || skillsWantedMatch;
    
    // Filter dropdown matches
    const matchesLevel = selectedLevel === 'All' || u.experience === selectedLevel;
    const matchesSkill = selectedSkill === 'All' || (u.skillsOffered || []).includes(selectedSkill);
    
    return matchesSearch && matchesLevel && matchesSkill;
  });

  // Filter Community Resources as fallback
  const filteredResources = resources.filter(res => {
    const searchLower = searchTerm.toLowerCase();
    return res.title.toLowerCase().includes(searchLower) || 
           res.category.toLowerCase().includes(searchLower);
  });

  return (
    <>
      {isLoading && <Loader message="Connecting to community..." />}
      <div className="min-h-[85vh] py-12 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-300 rounded-full blur-[180px] opacity-20 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-300 rounded-full blur-[180px] opacity-20 -z-10"></div>

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-in fade-in slide-in-from-top-4 duration-700">
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 to-purple-600 mb-4">
              Explore Community
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg mb-8">
              Connect with real learners who have shared their skills on the hub.
            </p>
            <div className="flex justify-center gap-4">
              <span className="bg-indigo-50 text-indigo-700 px-4 py-2 rounded-2xl font-bold text-xs border border-indigo-100">
                👤 {allUsers.length} Members Online
              </span>
            </div>
          </div>

          {/* ── ADVANCED FILTERS ── */}
          <div className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl p-6 shadow-xl mb-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
              
              <div className="md:col-span-1">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Search Keywords</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
                  <input
                    type="text"
                    placeholder="Search names, React, Python..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-11 pr-5 py-3.5 bg-white/80 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Experience Level</label>
                <select 
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="w-full px-5 py-3.5 bg-white/80 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all shadow-sm appearance-none cursor-pointer"
                >
                  {['All', 'Beginner', 'Intermediate', 'Expert'].map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Looking for Skill</label>
                <select 
                  value={selectedSkill}
                  onChange={(e) => setSelectedSkill(e.target.value)}
                  className="w-full px-5 py-3.5 bg-white/80 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 outline-none transition-all shadow-sm appearance-none cursor-pointer"
                >
                  {allAvailableSkills.map(skill => (
                    <option key={skill} value={skill}>{skill}</option>
                  ))}
                </select>
              </div>

            </div>
          </div>

          <div className="space-y-16">
            
            {/* Live Real Users Section */}
            {filteredUsers.length > 0 ? (
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-2xl font-black text-gray-800">Available Partners</h2>
                  <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold">{filteredUsers.length} Found</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredUsers.map((u) => (
                    <UserCard key={u.email} user={u} />
                  ))}
                </div>
              </div>
            ) : (
              /* Community Resources Fallback only if no users found */
              filteredResources.length > 0 && (
                <div>
                  <div className="bg-indigo-50/50 p-10 rounded-[3rem] border border-indigo-100 mb-12 animate-in zoom-in duration-700">
                    <div className="max-w-2xl">
                      <h2 className="text-3xl font-black text-indigo-900 mb-4">No Partners Found? Try these tutorials! 💡</h2>
                      <p className="text-indigo-700 font-medium mb-6">
                        No real users are currently offering <span className="underline decoration-indigo-300">"{searchTerm || selectedSkill}"</span>, 
                        but you can start learning immediately with these community-shared resources!
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                      {filteredResources.map((res) => (
                        <ResourceCard key={res.id} resource={res} />
                      ))}
                    </div>
                  </div>
                </div>
              )
            )}

            {/* Total Empty State */}
            {filteredUsers.length === 0 && filteredResources.length === 0 && (
              <div className="py-20">
                <EmptyState 
                  icon="🔍"
                  title="Nobody here yet"
                  message="We couldn't find any users or resources matching your criteria. Try searching for a different skill or clear your filters!"
                  actionLabel="Reset Filters"
                  onAction={() => { setSearchTerm(''); setSelectedLevel('All'); setSelectedSkill('All'); }}
                />
              </div>
            )}

          </div>
        </div>
      </div>
    </>
  );
};

export default FindSkills;
