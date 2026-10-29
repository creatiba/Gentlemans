import { useState } from 'react';
import {
  Scissors,
  Star,
  MapPin,
  Clock,
  Phone,
  Instagram,
  Sparkles,
  Baby,
  Crown,
  ArrowRight,
  Flame,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import BookingModal from '@/components/BookingModal';

const HERO_IMAGE = '/{16EF2DEE-9230-42ED-A521-0FC400EB807B}.png';
const MAP_IMAGE = '/{9E494667-D8FC-4E4B-92AE-AE4A9C1682F8}.png';
const GALLERY_IMAGES = ['/image.png', '/image copy.png', '/image copy 2.png'];

interface Review {
  name: string;
  service: string;
  date: string;
  text?: string;
  response?: string;
}

const REVIEWS: Review[] = [
  { name: 'Issa', service: 'Corte Pelo', date: '22 sept 2026' },
  { name: 'Monica', service: 'Corte Pelo', date: '10 sept 2026', text: 'Tanto el trato como el peluquero de 10!' },
  { name: 'Issa', service: 'Corte Pelo', date: '2 jun 2026', text: 'top' },
  { name: 'Issa', service: 'Corte Pelo', date: '2 jun 2026', text: '10/10' },
  { name: 'Iahdih', service: 'Corte Barba', date: '16 abr 2026', text: 'Buen trato y muy profesional', response: 'muchas gracias' },
  { name: 'Issa', service: 'Corte Pelo', date: '13 abr 2026', text: '10/10', response: 'muchas gracias' },
];

interface Service {
  icon: typeof Scissors;
  title: string;
  description: string;
  highlight?: boolean;
}

const SERVICES: Service[] = [
  {
    icon: Scissors,
    title: 'Corte de Pelo',
    description:
      'Corte de precisión adaptado a tu estilo y forma facial. Lavado y peinado incluidos.',
  },
  {
    icon: Crown,
    title: 'Corte de Pelo + Barba',
    description:
      'El paquete completo. Corte personalizado con arreglo de barba y diseño a navaja.',
  },
  {
    icon: Baby,
    title: 'Corte Niño',
    description:
      'Cortes clásicos y modernos para los más pequeños, en un ambiente relajado y cómodo.',
  },
  {
    icon: Flame,
    title: 'Corte Premium',
    description:
      'Corte, barba, depilación de nariz y toalla caliente. La experiencia Gentleman completa.',
    highlight: true,
  },
];

export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false);

  const openBooking = () => setBookingOpen(true);
  const closeBooking = () => setBookingOpen(false);

  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased">
      <Navbar onBook={openBooking} />

      {/* Hero */}
      <section className="relative flex min-h-[680px] flex-col overflow-hidden bg-zinc-950">
        <img
          src={HERO_IMAGE}
          alt="Fachada completa de Gentleman's Cut en Barcelona"
          className="absolute inset-0 h-full w-full object-cover object-center brightness-110"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/25 to-black/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/15" />

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 items-center px-4 pb-12 pt-28 sm:px-6 sm:pt-32 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6 animate-slide-up">
              <Sparkles size={14} className="text-white" />
              <span className="text-xs font-medium tracking-wide uppercase">
                Barbería Premium · Barcelona
              </span>
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] animate-slide-up"
              style={{ animationDelay: '0.05s', animationFillMode: 'both' }}
            >
              Tu imagen,
              <br />
              <span className="text-white">elevada al máximo nivel.</span>
            </h1>

            <p
              className="mt-6 text-lg text-zinc-300 max-w-xl leading-relaxed animate-slide-up"
              style={{ animationDelay: '0.1s', animationFillMode: 'both' }}
            >
              La experiencia de barbería premium en Barcelona. Cortes de
              precisión en un entorno exclusivo.
            </p>

            <div
              className="mt-8 flex flex-col sm:flex-row gap-4 animate-slide-up"
              style={{ animationDelay: '0.15s', animationFillMode: 'both' }}
            >
              <button
                onClick={openBooking}
                className="group inline-flex items-center justify-center gap-2 bg-white text-black font-semibold text-base px-8 py-4 rounded-md hover:bg-zinc-200 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Haz tu Reserva
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
              <button
                onClick={() =>
                  document
                    .querySelector('#servicios')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
                className="inline-flex items-center justify-center border border-zinc-700 text-white font-medium text-base px-8 py-4 rounded-md hover:bg-zinc-900 transition-colors"
              >
                Ver Servicios
              </button>
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <SocialProofBand />
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="dark-texture py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">
              Nuestros Servicios
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Precisión en cada detalle
            </h2>
            <p className="mt-4 text-zinc-400 text-lg">
              Cada servicio está pensado para que salgas con la mejor versión de
              ti mismo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICES.map((service) => (
              <div
                key={service.title}
                className={`group relative flex flex-col bg-zinc-900 border rounded-lg p-6 transition-all hover:border-zinc-600 hover:bg-zinc-900/80 ${
                  service.highlight
                    ? 'border-zinc-600 ring-1 ring-zinc-700'
                    : 'border-zinc-800'
                }`}
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-md bg-zinc-800 group-hover:bg-white group-hover:text-black transition-colors mb-5">
                  <service.icon size={24} strokeWidth={2} />
                </div>
                <h3 className="text-lg font-bold tracking-tight mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed flex-grow">
                  {service.description}
                </p>
                <button
                  onClick={openBooking}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white group-hover:text-white transition-colors"
                >
                  Reservar
                  <ArrowRight
                    size={15}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>

                {service.highlight && (
                  <span className="absolute -top-2.5 right-4 bg-white text-black text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                    Top
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Galería */}
      <section id="galeria" className="py-24 bg-zinc-950 border-y border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">
              Galería
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              El arte del buen corte
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-4">
            {GALLERY_IMAGES.map((src, i) => (
              <div key={i} className={`group overflow-hidden rounded-lg ${i === 0 ? 'sm:col-span-2 md:col-span-2' : ''}`}>
                <img
                  src={src}
                  alt={`Galería Gentleman's Cut ${i + 1}`}
                  className="h-64 w-full object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0 sm:h-72"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reseñas */}
      <section id="resenas" className="border-y border-zinc-900 bg-black py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <span className="text-sm font-semibold uppercase tracking-widest text-zinc-500">Opiniones reales</span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">Lo dicen nuestros clientes</h2>
              <p className="mt-4 text-lg text-zinc-400">Experiencias verificadas de quienes ya han pasado por Gentleman's Cut.</p>
            </div>
            <div className="flex shrink-0 items-center gap-3 rounded-md border border-zinc-800 bg-zinc-900 px-4 py-3">
              <div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, index) => <Star key={index} size={16} className="fill-white text-white" strokeWidth={0} />)}</div>
              <span className="text-sm font-bold text-white">5.0 · 133 reseñas</span>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {REVIEWS.map((review, index) => <ReviewCard key={`${review.name}-${review.date}-${index}`} review={review} />)}
          </div>
        </div>
      </section>

      {/* Ubicación */}
      <section id="ubicacion" className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">
                Visítanos
              </span>
              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                En el corazón de Barcelona
              </h2>
              <p className="mt-4 text-zinc-400 text-lg">
                Te esperamos en un espacio diseñado para que disfrutes de la
                experiencia desde el primer minuto.
              </p>

              <div className="mt-8 space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-md bg-zinc-900 border border-zinc-800 shrink-0">
                    <MapPin size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500 uppercase tracking-wider font-medium">
                      Dirección
                    </p>
                    <p className="text-white font-medium mt-0.5">
                      Carrer de los Castillejos, 330
                    </p>
                    <p className="text-zinc-400">08025, Barcelona</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center rounded-md bg-zinc-900 border border-zinc-800 shrink-0">
                    <Clock size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500 uppercase tracking-wider font-medium">
                      Horario
                    </p>
                    <p className="text-white font-medium mt-0.5">
                      Lunes — Sábado
                    </p>
                    <p className="text-zinc-400">12:00 — 20:00</p>
                  </div>
                </div>
              </div>

              <button
                onClick={openBooking}
                className="mt-8 inline-flex items-center justify-center gap-2 bg-white text-black font-semibold text-base px-8 py-4 rounded-md hover:bg-zinc-200 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Haz tu Reserva
                <ArrowRight size={18} />
              </button>
            </div>

            <div className="h-[400px] overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900">
              <img
                src={MAP_IMAGE}
                alt="Mapa de ubicación de Gentleman's Cut en Barcelona"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-zinc-950 border-t border-zinc-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            ¿Listo para tu próxima transformación?
          </h2>
          <p className="mt-4 text-zinc-400 text-lg">
            Reserva en menos de un minuto. Sin llamadas, sin esperas.
          </p>
          <button
            onClick={openBooking}
            className="mt-8 inline-flex items-center justify-center gap-2 bg-white text-black font-semibold text-base px-10 py-4 rounded-md hover:bg-zinc-200 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Reservar Ahora
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white font-extrabold tracking-tight uppercase text-lg">
                Gentleman's Cut
              </h3>
              <p className="mt-3 text-sm text-zinc-400 max-w-xs leading-relaxed">
                Barbería premium en Barcelona. Cortes de precisión, experiencia
                exclusiva.
              </p>
            </div>

            <div>
              <p className="text-sm text-zinc-500 uppercase tracking-wider font-semibold mb-4">
                Contacto
              </p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-3 text-zinc-400">
                  <MapPin size={16} className="shrink-0" />
                  <span>Carrer de los Castillejos, 330, 08025, Barcelona</span>
                </li>
                <li className="flex items-center gap-3 text-zinc-400">
                  <Clock size={16} className="shrink-0" />
                  <span>Lunes — Sábado · 12:00 — 20:00</span>
                </li>
                <li>
                  <a
                    href="tel:+34000000000"
                    className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors"
                  >
                    <Phone size={16} className="shrink-0" />
                    <span>Llámanos</span>
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-sm text-zinc-500 uppercase tracking-wider font-semibold mb-4">
                Síguenos
              </p>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm"
              >
                <Instagram size={18} />
                <span>@gentlemanscut</span>
              </a>
              <button
                onClick={openBooking}
                className="block mt-6 bg-white text-black font-semibold text-sm px-6 py-3 rounded-md hover:bg-zinc-200 transition-colors"
              >
                Reservar Cita
              </button>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-zinc-600">
              © {new Date().getFullYear()} Gentleman's Cut. Todos los derechos
              reservados.
            </p>
            <p className="text-xs text-zinc-600">Barcelona, España</p>
          </div>
        </div>
      </footer>

      <BookingModal open={bookingOpen} onClose={closeBooking} />
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-zinc-800 bg-zinc-900 p-5 transition-colors hover:border-zinc-600">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-white">{review.name}</h3>
            <span className="rounded-full border border-zinc-700 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">Cliente verificado</span>
          </div>
          <p className="mt-1 text-xs text-zinc-500">{review.date}</p>
        </div>
        <div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, index) => <Star key={index} size={13} className="fill-white text-white" strokeWidth={0} />)}</div>
      </div>
      <div className="mt-5 space-y-1 text-xs text-zinc-500">
        <p><span className="text-zinc-600">Servicio:</span> {review.service}</p>
        <p><span className="text-zinc-600">Empleado:</span> Abdel</p>
      </div>
      {review.text && <p className="mt-5 text-sm font-medium leading-relaxed text-zinc-200">“{review.text}”</p>}
      {review.response && <div className="mt-4 border-l border-zinc-700 pl-3 text-xs text-zinc-500"><span className="font-semibold text-zinc-400">Respuesta del negocio</span><p className="mt-1">{review.response}</p></div>}
    </article>
  );
}

function SocialProofBand() {
  return (
    <div className="bg-black/80 backdrop-blur-md border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-extrabold tracking-tight">5.0</span>
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={16}
                className="text-white fill-white"
                strokeWidth={0}
              />
            ))}
          </div>
          <span className="text-sm font-semibold text-white">Excelente</span>
        </div>
        <div className="hidden sm:block w-px h-6 bg-zinc-800" />
        <p className="text-sm text-zinc-400 text-center sm:text-left">
          Basado en más de 130 reseñas de clientes reales
        </p>
      </div>
    </div>
  );
}
