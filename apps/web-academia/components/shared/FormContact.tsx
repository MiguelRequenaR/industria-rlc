"use client";

import { Send } from "lucide-react";
import { useState, FormEvent } from "react";
import { sendWhatsAppMessage, type FormContactData } from "@/utils/whatsapp-message-academy";

interface FormContactProps {
  courses: { id: string; title: string }[];
}

export default function FormContact({ courses }: FormContactProps) {
  const [formData, setFormData] = useState<FormContactData>({
    nombre: "",
    telefono: "",
    email: "",
    curso: "",
    mensaje: "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.nombre || !formData.telefono || !formData.email || !formData.mensaje) {
      alert("Por favor, completa todos los campos");
      return;
    }

    sendWhatsAppMessage(formData);

    setFormData({
      nombre: "",
      telefono: "",
      email: "",
      curso: "",
      mensaje: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="p-5 md:p-10">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre" className="block text-primary font-semibold mb-2">
            Nombre Completo
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Ingresa tu nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full px-6 py-2 border-2 border-gray-300 rounded-full focus:outline-none focus:border-secondary transition-colors"
            required
          />
        </div>

        <div>
          <label htmlFor="telefono" className="block text-primary font-semibold mb-2">
            Teléfono
          </label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            placeholder="Ingresa tu teléfono"
            value={formData.telefono}
            onChange={handleChange}
            className="w-full px-6 py-2 border-2 border-gray-300 rounded-full focus:outline-none focus:border-secondary transition-colors"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-primary font-semibold mb-2">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Ingresa tu correo electrónico"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-6 py-2 border-2 border-gray-300 rounded-full focus:outline-none focus:border-secondary transition-colors"
            required
          />
        </div>

        <div>
          <label htmlFor="curso" className="block text-primary font-semibold mb-2">
            Curso
          </label>
          <select
            id="curso"
            name="curso"
            value={formData.curso}
            onChange={(e) => setFormData(prev => ({ ...prev, curso: e.target.value }))}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-full focus:outline-none focus:border-secondary transition-colors"
            required
          >
            <option value="">Selecciona un curso</option>
            {courses.map((course) => (
              <option key={course.id} value={course.title}>
                {course.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="mensaje" className="block text-primary font-semibold mb-2">
            Mensaje
          </label>
          <textarea
            id="mensaje"
            name="mensaje"  
            placeholder="Escribe tu mensaje aquí..."
            value={formData.mensaje}
            onChange={handleChange}
            rows={5}
            className="w-full px-6 py-2 border-2 border-gray-300 rounded-3xl focus:outline-none focus:border-secondary transition-colors resize-none"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#FFC107] hover:bg-[#FFB300] text-primary font-bold py-4 px-6 rounded-full flex items-center justify-center gap-2 transition-colors shadow-lg cursor-pointer"
        >
          <Send className="w-5 h-5" />
          Enviar Mensaje
        </button>
      </form>
    </div>
  )
}
