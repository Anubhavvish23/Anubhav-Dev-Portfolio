import React from 'react';

interface ContactCardProps {
  children: React.ReactNode;
}

const ContactCard: React.FC<ContactCardProps> = ({ children }) => {
  return (
    <div
      className="relative flex justify-center min-h-[500px] w-full max-w-[420px] border-4 border-black dark:border-white rounded-2xl bg-gray-50 dark:bg-slate-900 overflow-hidden"
      style={{ boxShadow: '5px 5px 2.5px 6px rgb(209, 218, 218)' }}
    >
      <span className="absolute top-0 left-1/2 -translate-x-1/2 border border-black dark:border-white bg-black dark:bg-white w-20 h-2 rounded-br-xl rounded-bl-xl z-10" />
      <span className="absolute -right-2 top-14 border-4 border-black h-7 rounded-md z-10 dark:border-white" />
      <span className="absolute -right-2 bottom-36 border-4 border-black h-10 rounded-md z-10 dark:border-white" />
      <div className="w-full p-6 pt-8 pb-8">
        {children}
      </div>
    </div>
  );
};

export default ContactCard;
