import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Coffee, LogOut, TrendingUp, ShoppingBag, Award, Heart, Clock, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../config/api';

const recentOrders = [
  { name: 'Signature Espresso', time: '2 hours ago', price: '\$3.50', status: 'Ready' },
  { name: 'Almond Croissant', time: '2 hours ago', price: '\$4.25', status: 'Ready' },
  { name: 'Pour Over', time: 'Yesterday', price: '\$5.00', status: 'Completed' },
  { name: 'Matcha Latte', time: '2 days ago', price: '\$5.50', status: 'Completed' },
];

const favourites = [
  { name: 'Flat White', emoji: '☕', orders: 23 },
  { name: 'Almond Croissant', emoji: '🥐', orders: 18 },
  { name: 'Pour Over', emoji: '☕', orders: 15 },
];

const rewards = [
  { title: 'Free Pastry', description: 'Any pastry of your choice', points: 50, unlocked: true },
  { title: 'Free Coffee', description: 'Any drink up to \$6', points: 100, unlocked: true },
  { title: 'Barista\'s Pick', description: 'Exclusive seasonal blend', points: 200, unlocked: false },
  { title: 'Golden Cup', description: 'Unlimited refills for a day', points: 500, unlocked: false },
];

export default function Dashboard() {
  const { user, token, logout } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 17) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await fetch(`${API_URL}/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setDashboardData(data);
        }
      } catch {
        /* silent */
      }
    };
    if (token) fetchDashboard();
  }, [token]);

  const stats = dashboardData?.stats || { ordersToday: 42, revenueToday: 318.5, topDrink: 'Flat White', loyaltyPoints: 120 };
  const memberSince = dashboardData?.user?.memberSince
    ? new Date(dashboardData.user.memberSince).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : 'November 2026';

  return (
    <div className="min-h-screen bg-[#faf6ef] font-['DM_Sans',sans-serif] antialiased">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&family=Fraunces:opsz,wght@9..144,300;9..144,400&display=swap');`}</style>

      <nav className="border-b border-[#e6d8c6] bg-[#faf6ef]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 md:px-10">
          <Link to="/" className="flex items-center gap-2 text-[#3b2a20]">
            <Coffee className="h-5 w-5" strokeWidth={1.5} />
            <span className="font-['Fraunces',serif] text-xl tracking-tight">Maison Mocha</span>
          </Link>
          <div className="flex items-center gap-6">
            <div className="hidden items-center gap-3 sm:flex">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#3b2a20] text-sm font-medium text-[#f7f1e8]">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <span className="text-sm font-medium text-[#3b2a20]">{user?.name || 'User'}</span>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 rounded-full border border-[#e6d8c6] px-4 py-2 text-sm text-[#6b5444] transition-all duration-300 hover:border-[#c9a27e] hover:text-[#3b2a20]"
            >
              <LogOut className="h-4 w-4" strokeWidth={1.5} />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-6 py-10 md:px-10 md:py-14">
        <div className="mb-10">
          <h1 className="font-['Fraunces',serif] text-3xl font-light tracking-tight text-[#2a1b13] sm:text-4xl">
            {greeting}, {user?.name?.split(' ')[0] || 'there'}
          </h1>
          <p className="mt-2 text-[#6b5444]">
            Member since {memberSince} · Here's what's brewing for you today.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: ShoppingBag, label: 'Orders today', value: stats.ordersToday, accent: 'bg-[#efe4d3]' },
            { icon: TrendingUp, label: 'Revenue today', value: `\$${stats.revenueToday}`, accent: 'bg-[#e6d8c6]' },
            { icon: Heart, label: 'Top drink', value: stats.topDrink, accent: 'bg-[#efe4d3]' },
            { icon: Award, label: 'Loyalty points', value: stats.loyaltyPoints, accent: 'bg-[#e6d8c6]' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="group rounded-2xl border border-[#e6d8c6] bg-white p-6 transition-all duration-300 hover:border-[#c9a27e] hover:shadow-md hover:shadow-[#3b2a20]/5"
            >
              <div className={`mb-4 inline-flex rounded-xl ${stat.accent} p-3`}>
                <stat.icon className="h-5 w-5 text-[#3b2a20]" strokeWidth={1.5} />
              </div>
              <p className="text-sm text-[#6b5444]">{stat.label}</p>
              <p className="mt-1 font-['Fraunces',serif] text-2xl text-[#2a1b13]">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-[#e6d8c6] bg-white">
              <div className="flex items-center justify-between border-b border-[#e6d8c6] px-6 py-5">
                <h2 className="font-['Fraunces',serif] text-xl text-[#2a1b13]">Recent orders</h2>
                <Clock className="h-4 w-4 text-[#b9a690]" strokeWidth={1.5} />
              </div>
              <div className="divide-y divide-[#f5f0e8]">
                {recentOrders.map((order, i) => (
                  <div key={i} className="flex items-center justify-between px-6 py-4 transition-colors duration-200 hover:bg-[#faf6ef]">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#efe4d3] text-lg">
                        {order.name.includes('Croissant') ? '🥐' : '☕'}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#2a1b13]">{order.name}</p>
                        <p className="text-xs text-[#b9a690]">{order.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium text-[#8a5a3c]">{order.price}</span>
                      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        order.status === 'Ready'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-[#efe4d3] text-[#6b5444]'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-[#e6d8c6] bg-white">
              <div className="flex items-center justify-between border-b border-[#e6d8c6] px-6 py-5">
                <h2 className="font-['Fraunces',serif] text-xl text-[#2a1b13]">Rewards</h2>
                <Star className="h-4 w-4 text-[#c9a27e]" strokeWidth={1.5} />
              </div>
              <div className="grid gap-4 p-6 sm:grid-cols-2">
                {rewards.map((reward) => (
                  <div
                    key={reward.title}
                    className={`rounded-xl border p-5 transition-all duration-300 ${
                      reward.unlocked
                        ? 'border-[#c9a27e] bg-[#faf6ef]'
                        : 'border-[#e6d8c6] bg-white opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-[#2a1b13]">{reward.title}</h3>
                      <span className={`rounded-full px-2 py-0.5 text-xs ${
                        reward.unlocked
                          ? 'bg-[#c9a27e]/20 text-[#8a5a3c]'
                          : 'bg-[#e6d8c6] text-[#b9a690]'
                      }`}>
                        {reward.points} pts
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-[#6b5444]">{reward.description}</p>
                    {reward.unlocked && (
                      <button className="mt-3 rounded-full bg-[#3b2a20] px-4 py-1.5 text-xs font-medium text-[#f7f1e8] transition-colors duration-300 hover:bg-[#2a1b13]">
                        Redeem
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-2xl bg-[#2a1b13] p-6 text-[#e9dccb]">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#3b2a20]">
                <span className="text-3xl">☕</span>
              </div>
              <h3 className="font-['Fraunces',serif] text-xl">Today's special</h3>
              <p className="mt-2 text-sm text-[#b9a690]">
                Ethiopian Yirgacheffe — bright citrus notes with a honey-sweet finish. Limited availability.
              </p>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-['Fraunces',serif] text-2xl text-[#c9a27e]">\$4.50</span>
                <span className="text-xs text-[#8f7a66] line-through">\$6.00</span>
              </div>
              <button className="mt-4 w-full rounded-full bg-[#c9a27e] py-3 text-sm font-medium text-[#2a1b13] transition-colors duration-300 hover:bg-[#b8905e]">
                Order now
              </button>
            </div>

            <div className="rounded-2xl border border-[#e6d8c6] bg-white">
              <div className="border-b border-[#e6d8c6] px-6 py-5">
                <h2 className="font-['Fraunces',serif] text-xl text-[#2a1b13]">Your favourites</h2>
              </div>
              <div className="divide-y divide-[#f5f0e8]">
                {favourites.map((item) => (
                  <div key={item.name} className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{item.emoji}</span>
                      <span className="text-sm font-medium text-[#2a1b13]">{item.name}</span>
                    </div>
                    <span className="text-xs text-[#b9a690]">{item.orders} orders</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-[#c9a27e] bg-[#faf6ef] p-6">
              <div className="flex items-center gap-3">
                <Award className="h-5 w-5 text-[#c9a27e]" strokeWidth={1.5} />
                <h3 className="text-sm font-medium text-[#2a1b13]">Loyalty progress</h3>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-xs text-[#6b5444]">
                  <span>{stats.loyaltyPoints} points</span>
                  <span>200 pts</span>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-[#e6d8c6]">
                  <div
                    className="h-2 rounded-full bg-[#c9a27e] transition-all duration-700"
                    style={{ width: `${Math.min((stats.loyaltyPoints / 200) * 100, 100)}%` }}
                  />
                </div>
                <p className="mt-2 text-xs text-[#b9a690]">
                  {200 - stats.loyaltyPoints > 0 ? `${200 - stats.loyaltyPoints} points until "Barista's Pick"` : 'Reward unlocked!'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-[#e6d8c6] bg-[#faf6ef]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 md:px-10">
          <div className="flex items-center gap-2 text-[#b9a690]">
            <Coffee className="h-4 w-4" strokeWidth={1.5} />
            <span className="text-xs">© 2026 Maison Mocha</span>
          </div>
          <Link to="/" className="text-xs text-[#b9a690] transition-colors hover:text-[#3b2a20]">
            Back to home
          </Link>
        </div>
      </footer>
    </div>
  );
}

