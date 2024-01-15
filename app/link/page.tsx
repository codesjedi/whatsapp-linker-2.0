'use client';

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/rGYuR8El51l
 */
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { getFromClipboard, phoneValidation } from '@/lib/clipboard';
import { toast } from 'sonner';

export default function Form() {
  const [formData, setformData] = useState({
    phone: '',
    message: '',
  });
  const { push } = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanedPhoneNumber = formData.phone.trim().replaceAll(' ', '');
    if (!phoneValidation(cleanedPhoneNumber).success) {
      toast.error(`Telefono inválido.`);
      return;
    }
    push(
      `https://wa.me/${
        cleanedPhoneNumber.includes('+595') ||
        cleanedPhoneNumber.startsWith('595')
          ? cleanedPhoneNumber
          : `+595${cleanedPhoneNumber}`
      }?text=${formData.message}`
    );
  };

  const handleClipboard = async () => {
    try {
      const text = await getFromClipboard();
      const validationResult = phoneValidation(text);

      if (validationResult.success) {
        setformData((prev) => ({
          ...prev,
          phone: validationResult.data,
        }));
        toast.success(`Número de teléfono pegado correctamente.`);
      } else {
        toast.error(`Telefono inválido.`);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        `Error al pegar el número de teléfono, por favor concede los permisos o pegalo manualmente.`
      );
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#3ab88a] px-4 py-8">
      <div className="w-full max-w-md rounded-md bg-white p-6 shadow-md">
        <h1
          className="text-center text-2xl font-bold text-gray-800"
          style={{
            userSelect: 'none',
          }}
        >
          Ir al chat <SmartphoneIcon className="inline-block text-green-500" />
        </h1>
        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="flex items-center justify-between space-x-2">
            <Input
              className="flex-1"
              placeholder="Número de teléfono"
              type="tel"
              value={formData.phone}
              onChange={(event) => {
                setformData({
                  ...formData,
                  phone: event.target.value,
                });
              }}
            />
            <Button
              className="bg-green-500 text-white"
              onClick={handleClipboard}
              type="button"
            >
              <ClipboardPasteIcon className="inline-block" />
            </Button>
          </div>
          <div className="mt-4">
            <Textarea
              className="w-full"
              placeholder="Introduce el texto que deseas enviar"
              value={formData.message}
              onChange={(event) => {
                setformData((prev) => ({
                  ...prev,
                  message: event.target.value,
                }));
              }}
            />
          </div>
          <div className="mt-6 flex justify-center">
            <Button className="bg-green-500 text-white" type="submit">
              Ir al whatsapp <SmartphoneIcon className="ml-2" />
            </Button>
          </div>
        </form>
      </div>
      <Link
        href={'https://enrique.digital'}
        className="mt-8 text-center text-white text-sm"
        rel="noopener noreferrer"
        target="_blank"
      >
        <p>
          Desarrollado por Enrique Gimenez <CodeIcon className="inline-block" />
        </p>
      </Link>
    </div>
  );
}

function ClipboardPasteIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H9a1 1 0 0 0-1 1v2c0 .6.4 1 1 1h6c.6 0 1-.4 1-1V3c0-.6-.4-1-1-1Z" />
      <path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2M16 4h2a2 2 0 0 1 2 2v2M11 14h10" />
      <path d="m17 10 4 4-4 4" />
    </svg>
  );
}

function CodeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function SmartphoneIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <path d="M12 18h.01" />
    </svg>
  );
}
