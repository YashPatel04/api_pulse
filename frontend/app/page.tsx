'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
    };
    checkAuth();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-indigo-600">API Pulse</div>
          <nav className="flex items-center gap-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900 text-sm">Features</a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900 text-sm">Pricing</a>
            <a href="#faq" className="text-gray-600 hover:text-gray-900 text-sm">FAQ</a>
            {isLoggedIn ? (
              <Link href="/dashboard" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 text-sm">
                Dashboard
              </Link>
            ) : (
              <Link href="/auth/login" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 text-sm">
                Sign In
              </Link>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Automate API Calls<br />
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">On Your Schedule</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Schedule any API endpoint. Get results delivered automatically. No servers, no cron, no DevOps.
          </p>
          <div className="flex gap-4 justify-center mb-20">
            <Link href="/auth/signup" className="bg-indigo-600 text-white px-8 py-4 rounded-lg hover:bg-indigo-700 font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200">
              Start Free
            </Link>
            <a href="#how-it-works" className="border-2 border-gray-300 text-gray-900 px-8 py-4 rounded-lg hover:border-indigo-600 hover:text-indigo-600 font-semibold transition-all duration-200">
              Learn More
            </a>
          </div>
        </div>
        
        {/* Hero Illustration */}
        <div className="animate-slide-up bg-gradient-to-br from-indigo-50 via-white to-purple-50 rounded-2xl p-12 max-w-3xl mx-auto border border-gray-100 shadow-lg">
          <div className="flex items-center justify-between gap-6">
            <div className="text-center flex-1 hover:scale-110 transition-transform duration-300">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3 text-xl">1</div>
              <p className="text-sm font-semibold text-gray-900">Add API URL</p>
            </div>
            <div className="text-2xl text-indigo-400 font-light">→</div>
            <div className="text-center flex-1 hover:scale-110 transition-transform duration-300">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 text-xl">2</div>
              <p className="text-sm font-semibold text-gray-900">Set Schedule</p>
            </div>
            <div className="text-2xl text-indigo-400 font-light">→</div>
            <div className="text-center flex-1 hover:scale-110 transition-transform duration-300">
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3 text-xl">3</div>
              <p className="text-sm font-semibold text-gray-900">Get Results</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gradient-to-b from-gray-50 to-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to schedule and monitor API calls automatically
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <div className="group bg-white rounded-xl p-8 border border-gray-100 hover:border-indigo-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Schedule Any API</h3>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li className="flex items-center"><span className="w-1 h-1 bg-indigo-600 rounded-full mr-3"></span> GET and POST requests</li>
                <li className="flex items-center"><span className="w-1 h-1 bg-indigo-600 rounded-full mr-3"></span> Custom headers and body</li>
                <li className="flex items-center"><span className="w-1 h-1 bg-indigo-600 rounded-full mr-3"></span> Run every minute, hour, or day</li>
                <li className="flex items-center"><span className="w-1 h-1 bg-indigo-600 rounded-full mr-3"></span> Pause and resume anytime</li>
              </ul>
            </div>

            {/* Feature 2 */}
            <div className="group bg-white rounded-xl p-8 border border-gray-100 hover:border-indigo-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Multiple Delivery Options</h3>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li className="flex items-center"><span className="w-1 h-1 bg-purple-600 rounded-full mr-3"></span> Email notifications</li>
                <li className="flex items-center"><span className="w-1 h-1 bg-purple-600 rounded-full mr-3"></span> Slack integration</li>
                <li className="flex items-center"><span className="w-1 h-1 bg-purple-600 rounded-full mr-3"></span> Discord webhooks</li>
                <li className="flex items-center"><span className="w-1 h-1 bg-purple-600 rounded-full mr-3"></span> Custom webhooks</li>
              </ul>
            </div>

            {/* Feature 3 */}
            <div className="group bg-white rounded-xl p-8 border border-gray-100 hover:border-indigo-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Complete Run History</h3>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li className="flex items-center"><span className="w-1 h-1 bg-green-600 rounded-full mr-3"></span> View every execution</li>
                <li className="flex items-center"><span className="w-1 h-1 bg-green-600 rounded-full mr-3"></span> Success/failure status</li>
                <li className="flex items-center"><span className="w-1 h-1 bg-green-600 rounded-full mr-3"></span> Response preview and timing</li>
                <li className="flex items-center"><span className="w-1 h-1 bg-green-600 rounded-full mr-3"></span> Error details and debugging</li>
              </ul>
            </div>

            {/* Feature 4 */}
            <div className="group bg-white rounded-xl p-8 border border-gray-100 hover:border-indigo-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Zero Setup Required</h3>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li className="flex items-center"><span className="w-1 h-1 bg-orange-600 rounded-full mr-3"></span> No servers to manage</li>
                <li className="flex items-center"><span className="w-1 h-1 bg-orange-600 rounded-full mr-3"></span> No installation needed</li>
                <li className="flex items-center"><span className="w-1 h-1 bg-orange-600 rounded-full mr-3"></span> Just paste your API URL</li>
                <li className="flex items-center"><span className="w-1 h-1 bg-orange-600 rounded-full mr-3"></span> Start in seconds</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">How It Works</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three simple steps to automate your API calls
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center group">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-600 to-indigo-700 text-white rounded-full font-bold text-2xl mx-auto mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                1
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Add an API URL</h3>
              <p className="text-gray-600 leading-relaxed">
                Paste your API endpoint URL into the dashboard. No code, no configuration needed.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center group">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-full font-bold text-2xl mx-auto mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                2
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Choose a Schedule</h3>
              <p className="text-gray-600 leading-relaxed">
                Select how often you want it to run: every minute, hour, day, or a custom interval.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center group">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-full font-bold text-2xl mx-auto mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                3
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Get Results Automatically</h3>
              <p className="text-gray-600 leading-relaxed">
                Results are delivered automatically and logged for you to review anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="bg-gradient-to-b from-white to-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">Simple Pricing</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the plan that fits your needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
              <p className="text-gray-600 mb-6">Get started with zero cost</p>
              <div className="text-4xl font-bold text-gray-900 mb-8">$0<span className="text-base text-gray-600 font-normal">/mo</span></div>
              <ul className="text-gray-600 space-y-3 mb-8">
                <li className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span> 5 API jobs</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span> Every 15 minutes</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span> Email alerts</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span> 24 hour history</li>
              </ul>
              <Link href="/auth/signup" className="w-full bg-gray-100 text-gray-900 px-4 py-3 rounded-lg hover:bg-gray-200 font-semibold text-center block transition-all duration-200">
                Get Started
              </Link>
            </div>

            {/* Pro Plan - Featured */}
            <div className="relative md:scale-105 group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative bg-white rounded-2xl p-8 border-2 border-indigo-600">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-1 rounded-full text-sm font-bold">Most Popular</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro</h3>
                <p className="text-gray-600 mb-6">For power users</p>
                <div className="text-4xl font-bold text-gray-900 mb-8">$9<span className="text-base text-gray-600 font-normal">/mo</span></div>
                <ul className="text-gray-600 space-y-3 mb-8">
                  <li className="flex items-center"><span className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></span> Unlimited jobs</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></span> Every minute</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></span> Slack & Discord</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></span> 30 day history</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></span> Priority support</li>
                </ul>
                <Link href="/auth/signup" className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-3 rounded-lg hover:shadow-lg font-semibold text-center block transition-all duration-200 transform hover:scale-105">
                  Start Pro
                </Link>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
              <p className="text-gray-600 mb-6">For teams and scale</p>
              <div className="text-4xl font-bold text-gray-900 mb-8">$29<span className="text-base text-gray-600 font-normal">/mo</span></div>
              <ul className="text-gray-600 space-y-3 mb-8">
                <li className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span> Everything in Pro</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span> 90 day history</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span> Team access</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span> SLA support</li>
                <li className="flex items-center"><span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span> API access</li>
              </ul>
              <Link href="/auth/signup" className="w-full bg-gray-100 text-gray-900 px-4 py-3 rounded-lg hover:bg-gray-200 font-semibold text-center block transition-all duration-200">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto"></div>
          </div>

          <div className="space-y-4">
            {/* FAQ Item 1 */}
            <details className="group bg-white rounded-xl p-6 border border-gray-100 hover:border-indigo-200 hover:shadow-lg transition-all duration-300 cursor-pointer">
              <summary className="font-semibold text-gray-900 flex justify-between items-center select-none">
                How secure is API Pulse?
                <span className="text-2xl group-open:rotate-45 transition-transform duration-300">+</span>
              </summary>
              <p className="text-gray-600 mt-4 leading-relaxed">
                We use industry-standard encryption, Row-Level Security policies, and secure API authentication. Your API URLs and responses are encrypted at rest and in transit.
              </p>
            </details>

            {/* FAQ Item 2 */}
            <details className="group bg-white rounded-xl p-6 border border-gray-100 hover:border-indigo-200 hover:shadow-lg transition-all duration-300 cursor-pointer">
              <summary className="font-semibold text-gray-900 flex justify-between items-center select-none">
                How do I authenticate API requests?
                <span className="text-2xl group-open:rotate-45 transition-transform duration-300">+</span>
              </summary>
              <p className="text-gray-600 mt-4 leading-relaxed">
                You can add custom headers to your requests, including Authorization headers. API keys, Bearer tokens, and Basic Auth are all supported.
              </p>
            </details>

            {/* FAQ Item 3 */}
            <details className="group bg-white rounded-xl p-6 border border-gray-100 hover:border-indigo-200 hover:shadow-lg transition-all duration-300 cursor-pointer">
              <summary className="font-semibold text-gray-900 flex justify-between items-center select-none">
                Can I send POST bodies?
                <span className="text-2xl group-open:rotate-45 transition-transform duration-300">+</span>
              </summary>
              <p className="text-gray-600 mt-4 leading-relaxed">
                Yes! You can choose GET or POST methods and add custom JSON request bodies, headers, and parameters as needed.
              </p>
            </details>

            {/* FAQ Item 4 */}
            <details className="group bg-white rounded-xl p-6 border border-gray-100 hover:border-indigo-200 hover:shadow-lg transition-all duration-300 cursor-pointer">
              <summary className="font-semibold text-gray-900 flex justify-between items-center select-none">
                Do you store my API response data?
                <span className="text-2xl group-open:rotate-45 transition-transform duration-300">+</span>
              </summary>
              <p className="text-gray-600 mt-4 leading-relaxed">
                Yes, we store response logs so you can review past executions. You can view logs for the duration of your plan (24h, 30d, or 90d).
              </p>
            </details>

            {/* FAQ Item 5 */}
            <details className="group bg-white rounded-xl p-6 border border-gray-100 hover:border-indigo-200 hover:shadow-lg transition-all duration-300 cursor-pointer">
              <summary className="font-semibold text-gray-900 flex justify-between items-center select-none">
                Can I export logs?
                <span className="text-2xl group-open:rotate-45 transition-transform duration-300">+</span>
              </summary>
              <p className="text-gray-600 mt-4 leading-relaxed">
                Coming soon! We're working on CSV and JSON export features for Pro and Enterprise users.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold text-white mb-6">Ready to automate?</h2>
          <p className="text-indigo-100 mb-10 text-xl leading-relaxed">
            Start scheduling your API calls in seconds. No credit card required.
          </p>
          <Link href="/auth/signup" className="bg-white text-indigo-600 px-10 py-4 rounded-lg hover:bg-indigo-50 font-bold text-lg inline-block shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200">
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-white mb-4">API Pulse</h4>
              <p className="text-sm">Schedule and monitor API calls automatically.</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Product</h4>
              <ul className="text-sm space-y-2">
                <li><a href="#features" className="hover:text-white">Features</a></li>
                <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
                <li><a href="#" className="hover:text-white">Status</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Legal</h4>
              <ul className="text-sm space-y-2">
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Connect</h4>
              <ul className="text-sm space-y-2">
                <li><a href="#" className="hover:text-white">GitHub</a></li>
                <li><a href="#" className="hover:text-white">Twitter</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-sm text-center">
            <p>&copy; 2025 API Pulse. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
