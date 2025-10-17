
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { UsersIcon, BriefcaseIcon, HeartIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-background flex flex-col min-h-screen text-primary-text">
      <Header />
      <main className="flex-grow">
        <section className="bg-surface py-20">
          <div className="container mx-auto px-6 text-center animate-subtle-enter">
            <h1 className="text-4xl md:text-5xl font-bold text-primary-text mb-4 font-prompt">คลังเวลาคืออะไร?</h1>
            <p className="text-lg text-secondary-text max-w-3xl mx-auto mb-16">
              คลังเวลาคือแนวคิดที่ปฏิวัติการช่วยเหลือซึ่งกันและกันในชุมชน โดยสมาชิกสามารถ "ฝาก" เวลาของตนเองโดยการใช้ทักษะและความสามารถช่วยเหลือผู้อื่น และสามารถ "ถอน" เวลาเหล่านั้นออกมาใช้เมื่อต้องการความช่วยเหลือในเรื่องอื่น โดยมี "เวลา" เป็นสื่อกลางในการแลกเปลี่ยนแทนที่เงินตรา สร้างสังคมที่เท่าเทียมและเกื้อกูล
            </p>
            <div className="grid md:grid-cols-3 gap-12">
              <div className="flex flex-col items-center animate-subtle-enter" style={{animationDelay: '100ms'}}>
                <div className="bg-accent-light p-5 rounded-full mb-4">
                  <UsersIcon className="w-10 h-10 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-primary-text">สร้างชุมชนที่เข้มแข็ง</h3>
                <p className="text-secondary-text">เชื่อมโยงผู้คนในชุมชนให้ใกล้ชิดกันมากขึ้นผ่านการช่วยเหลือซึ่งกันและกัน สร้างเครือข่ายความสัมพันธ์ที่อบอุ่นและปลอดภัย</p>
              </div>
              <div className="flex flex-col items-center animate-subtle-enter" style={{animationDelay: '200ms'}}>
                <div className="bg-accent-light p-5 rounded-full mb-4">
                  <BriefcaseIcon className="w-10 h-10 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-primary-text">แลกเปลี่ยนทักษะที่หลากหลาย</h3>
                <p className="text-secondary-text">ทุกคนมีทักษะที่สามารถแบ่งปันได้ ไม่ว่าจะเป็นการสอน, การซ่อมแซม, งานฝีมือ, หรือแม้กระทั่งการให้คำปรึกษา</p>
              </div>
              <div className="flex flex-col items-center animate-subtle-enter" style={{animationDelay: '300ms'}}>
                <div className="bg-accent-light p-5 rounded-full mb-4">
                  <HeartIcon className="w-10 h-10 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-primary-text">ทุกชั่วโมงมีค่าเท่ากัน</h3>
                <p className="text-secondary-text">หัวใจของคลังเวลาคือความเท่าเทียม เวลาหนึ่งชั่วโมงของทุกคนมีค่าเท่ากันเสมอ ไม่ว่าทักษะนั้นจะเป็นอะไรก็ตาม</p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="bg-background py-20">
            <div className="container mx-auto px-6 text-center">
                 <h2 className="text-3xl font-bold text-primary-text mb-4 font-prompt">พร้อมที่จะเป็นส่วนหนึ่งของเราแล้วหรือยัง?</h2>
                 <p className="text-secondary-text max-w-2xl mx-auto mb-8">เข้าร่วมชุมชนแห่งการแบ่งปันของเราวันนี้ และร่วมสร้างสังคมที่น่าอยู่ยิ่งขึ้น</p>
                 <Link to="/register" className="bg-accent hover:bg-accent-hover text-white font-bold py-3 px-8 rounded-full transition-transform hover:scale-105 shadow-lg shadow-accent/20">
                    สมัครสมาชิกเลย
                </Link>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
