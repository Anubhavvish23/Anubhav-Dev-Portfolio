import React from 'react';

interface ContactCardProps {
  children: React.ReactNode;
}

const ContactCard: React.FC<ContactCardProps> = ({ children }) => {
  return (
    <div
      className="relative flex justify-center min-h-[400px] w-full max-w-[340px] border-4 border-black dark:border-[#262626] rounded-2xl bg-gray-50 dark:bg-[#0a0a0a] overflow-hidden"
      style={{ boxShadow: '5px 5px 2.5px 6px rgb(209, 218, 218)' }}
    >
      <span className="absolute top-0 left-1/2 -translate-x-1/2 border border-black dark:border-[#262626] bg-black dark:bg-[#141414] w-16 h-1.5 rounded-br-xl rounded-bl-xl z-10" />
      <span className="absolute -right-2 top-12 border-4 border-black h-6 rounded-md z-10 dark:border-[#262626]" />
      <span className="absolute -right-2 bottom-32 border-4 border-black h-8 rounded-md z-10 dark:border-[#262626]" />
      <div className="w-full p-5 pt-7 pb-6">
        {children}
      </div>
    </div>
  );
};

export default ContactCard;
