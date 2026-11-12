import React from 'react';
import { CheckCircle2, ShieldCheck, HelpCircle, ArrowRight } from 'lucide-react';
import { useData } from '../context/DataContext';

interface PricingPageProps {
  onOpenBooking: (itemTitle?: string, type?: 'experience' | 'event' | 'custom') => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onOpenBooking }) => {
  const { pricing } = useData();

  return (
    <div className="pt-28 sm:pt-36 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-blue-400">
          Transparent Rates
        </span>
        <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          EXPERIENCE PASSES & PACKAGES
        </h1>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          No hidden fees, no equipment rental add-ons. Every pass includes high-resolution commercial VR equipment, dedicated operator onboarding, and full access to our calibrated hardware setups.
        </p>
      </div>

      {/* Main Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pricing.map((plan) => (
          <div
            key={plan.id}
            className={`p-6 sm:p-8 rounded-2xl flex flex-col justify-between transition-colors ${
              plan.isPopular
                ? 'bg-[#101828] border-2 border-blue-500 shadow-xl shadow-blue-900/20'
                : 'bg-[#0D131F] border border-slate-800'
            }`}
          >
            <div>
              {plan.isPopular && (
                <span className="text-[10px] uppercase font-bold tracking-widest text-blue-400 block mb-2">
                  RECOMMENDED PASS
                </span>
              )}
              <h3 className="font-display text-xl font-bold text-white mb-1">{plan.title}</h3>
              <span className="text-xs text-slate-400 block mb-3">Duration: {plan.duration}</span>

              <div className="flex items-baseline gap-1 my-3">
                <span className="text-3xl sm:text-4xl font-extrabold text-white tabular-nums">
                  {plan.price}
                </span>
                {plan.period && <span className="text-xs text-slate-400">/{plan.period}</span>}
              </div>

              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                {plan.description}
              </p>

              <div className="space-y-2.5 border-t border-slate-800/80 pt-5 mb-8">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  What's Included:
                </span>
                {plan.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[11px] text-slate-400 mb-3 text-center">
                Best for: <span className="text-slate-200 font-medium">{plan.recommendedFor}</span>
              </div>
              <button
                onClick={() => onOpenBooking(plan.title, plan.category === 'events' ? 'event' : 'experience')}
                className={`w-full py-3 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 ${
                  plan.isPopular
                    ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-sm'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                }`}
              >
                <span>Select Pass</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Trust & Quality Guarantee */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#0C121E] border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-950 border border-blue-800 flex items-center justify-center text-blue-400 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-display text-base font-bold text-white">The PDVR Commercial Quality Guarantee</h4>
            <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-1">
              If any participant experiences motion discomfort during the first 3 minutes of any VR title, our operator will instantly switch them to a calm seated simulation or offer an alternate title at no extra cost.
            </p>
          </div>
        </div>

        <button
          onClick={() => onOpenBooking(undefined, 'custom')}
          className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold whitespace-nowrap transition-colors"
        >
          Custom Group Quote
        </button>
      </div>

      {/* Pricing FAQs */}
      <div className="max-w-3xl mx-auto space-y-6">
        <h3 className="font-display text-xl font-bold text-white text-center">
          FREQUENTLY ASKED QUESTIONS
        </h3>

        <div className="space-y-4">
          <div className="p-5 rounded-xl bg-[#0D131F] border border-slate-800 space-y-1.5">
            <h4 className="text-sm font-bold text-white">How do payments work?</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              For walk-ins or single passes, we accept UPI, debit/credit cards, and cash. For apartment setups or school events, a 20% advance secures your date and crew, with the remainder payable upon event completion.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#0D131F] border border-slate-800 space-y-1.5">
            <h4 className="text-sm font-bold text-white">What age is suitable for VR?</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              We cater to guests aged 4 to 65. We have curated gentle, wonder-filled experiences designed specifically for young kids (ages 4-7), engaging adventures for children, and high-octane simulators for youth and adults.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#0D131F] border border-slate-800 space-y-1.5">
            <h4 className="text-sm font-bold text-white">Can people who wear glasses use the VR headsets?</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Yes! Our commercial VR headsets are equipped with prescription eyeglasses spacers to ensure standard frames fit comfortably without scratching the lenses.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
