import { useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Scissors,
  UserRound,
  X,
} from 'lucide-react';

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
}

interface ServiceOption {
  title: string;
  detail: string;
  duration: string;
}

const SERVICES: ServiceOption[] = [
  { title: 'Corte de Pelo', detail: 'Corte de precisión y peinado', duration: '30 min' },
  { title: 'Corte de Pelo + Barba', detail: 'Corte, arreglo y diseño de barba', duration: '45 min' },
  { title: 'Corte Niño', detail: 'Corte adaptado para los más pequeños', duration: '30 min' },
  {
    title: 'Corte Premium',
    detail: 'Pelo, barba, nariz y toalla caliente',
    duration: '60 min',
  },
];

const TIMES = ['12:00', '12:30', '13:00', '13:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00'];
const WEEKDAYS = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

function getCalendarDays(month: Date): Array<number | null> {
  const firstDay = new Date(month.getFullYear(), month.getMonth(), 1).getDay();
  const offset = firstDay === 0 ? 6 : firstDay - 1;
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  return [...Array.from({ length: offset }, () => null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];
}

export default function BookingModal({ open, onClose }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [service, setService] = useState<ServiceOption | null>(null);
  const [month, setMonth] = useState(() => new Date(2026, 9, 1));
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const calendarDays = useMemo(() => getCalendarDays(month), [month]);
  const monthLabel = new Intl.DateTimeFormat('es-ES', { month: 'long', year: 'numeric' }).format(month);
  const formattedDate = selectedDay
    ? new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }).format(
        new Date(month.getFullYear(), month.getMonth(), selectedDay),
      )
    : '';

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const resetBooking = () => {
    setStep(1);
    setService(null);
    setSelectedDay(null);
    setSelectedTime(null);
    setConfirmed(false);
    setMonth(new Date(2026, 9, 1));
  };

  const handleClose = () => {
    resetBooking();
    onClose();
  };

  const canContinue = (step === 1 && service) || (step === 2) || (step === 3 && selectedDay && selectedTime);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-3 backdrop-blur-sm sm:p-6" onClick={handleClose}>
      <div className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 shadow-2xl" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-zinc-800 px-5 py-4 sm:px-7">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Gentleman's Cut</p>
            <h2 className="mt-1 text-lg font-bold tracking-tight text-white">Reserva tu cita</h2>
          </div>
          <button onClick={handleClose} aria-label="Cerrar reserva" className="rounded-md p-2 text-zinc-500 transition-colors hover:bg-zinc-900 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {!confirmed && (
          <div className="border-b border-zinc-800 px-5 py-4 sm:px-7">
            <div className="flex items-center justify-between gap-2">
              {[['1', 'Servicio'], ['2', 'Profesional'], ['3', 'Fecha y hora'], ['4', 'Confirmación']].map(([number, label], index) => {
                const active = step >= Number(number);
                return (
                  <div key={number} className="flex min-w-0 flex-1 items-center gap-2">
                    <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-bold ${active ? 'border-white bg-white text-black' : 'border-zinc-700 text-zinc-600'}`}>
                      {number}
                    </div>
                    <span className={`hidden truncate text-xs font-medium sm:block ${active ? 'text-white' : 'text-zinc-600'}`}>{label}</span>
                    {index < 3 && <div className={`hidden h-px flex-1 sm:block ${step > Number(number) ? 'bg-white' : 'bg-zinc-800'}`} />}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="overflow-y-auto px-5 py-6 sm:px-7 sm:py-7">
          {confirmed ? (
            <Confirmation service={service} formattedDate={formattedDate} selectedTime={selectedTime} onClose={handleClose} />
          ) : (
            <>
              {step === 1 && <ServiceStep selected={service} onSelect={setService} />}
              {step === 2 && <ProfessionalStep />}
              {step === 3 && (
                <DateStep
                  month={month}
                  monthLabel={monthLabel}
                  calendarDays={calendarDays}
                  selectedDay={selectedDay}
                  selectedTime={selectedTime}
                  onPreviousMonth={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}
                  onNextMonth={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}
                  onSelectDay={setSelectedDay}
                  onSelectTime={setSelectedTime}
                />
              )}
              {step === 4 && <ReviewStep service={service} formattedDate={formattedDate} selectedTime={selectedTime} />}
            </>
          )}
        </div>

        {!confirmed && (
          <div className="flex items-center justify-between border-t border-zinc-800 bg-zinc-950 px-5 py-4 sm:px-7">
            <button onClick={() => setStep((current) => Math.max(1, current - 1))} disabled={step === 1} className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-zinc-500 transition-colors hover:text-white disabled:invisible">
              <ArrowLeft size={16} /> Atrás
            </button>
            <button
              onClick={() => (step === 4 ? setConfirmed(true) : setStep((current) => current + 1))}
              disabled={!canContinue}
              className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-bold text-black transition-all hover:bg-zinc-200 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-600"
            >
              {step === 4 ? 'Confirmar reserva' : 'Continuar'} <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function ServiceStep({ selected, onSelect }: { selected: ServiceOption | null; onSelect: (service: ServiceOption) => void }) {
  return (
    <div>
      <StepHeading eyebrow="Paso 1 de 4" title="Elige tu servicio" description="Selecciona la experiencia que quieres disfrutar." />
      <div className="grid gap-3 sm:grid-cols-2">
        {SERVICES.map((option) => (
          <button key={option.title} onClick={() => onSelect(option)} className={`group rounded-md border p-4 text-left transition-all ${selected?.title === option.title ? 'border-white bg-white text-black' : 'border-zinc-800 bg-zinc-900 hover:border-zinc-600'}`}>
            <div className="flex items-start justify-between gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-md ${selected?.title === option.title ? 'bg-black text-white' : 'bg-zinc-800 text-white'}`}><Scissors size={18} /></div>
              {selected?.title === option.title && <Check size={18} />}
            </div>
            <p className="mt-4 font-bold tracking-tight">{option.title}</p>
            <p className={`mt-1 text-sm ${selected?.title === option.title ? 'text-zinc-600' : 'text-zinc-400'}`}>{option.detail}</p>
            <p className={`mt-3 text-xs font-semibold uppercase tracking-wider ${selected?.title === option.title ? 'text-zinc-500' : 'text-zinc-600'}`}>{option.duration}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

function ProfessionalStep() {
  return (
    <div>
      <StepHeading eyebrow="Paso 2 de 4" title="Elige tu profesional" description="Nuestro equipo está listo para cuidar cada detalle." />
      <button className="flex w-full items-center gap-4 rounded-md border border-white bg-white p-5 text-left text-black">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white"><UserRound size={22} /></div>
        <div className="flex-1"><p className="font-bold">Abdel</p><p className="mt-1 text-sm text-zinc-600">Barbero profesional</p></div>
        <Check size={20} />
      </button>
    </div>
  );
}

interface DateStepProps {
  month: Date;
  monthLabel: string;
  calendarDays: Array<number | null>;
  selectedDay: number | null;
  selectedTime: string | null;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onSelectDay: (day: number) => void;
  onSelectTime: (time: string) => void;
}

function DateStep({ month, monthLabel, calendarDays, selectedDay, selectedTime, onPreviousMonth, onNextMonth, onSelectDay, onSelectTime }: DateStepProps) {
  return (
    <div>
      <StepHeading eyebrow="Paso 3 de 4" title="Elige fecha y hora" description="Selecciona el momento que mejor te encaje." />
      <div className="grid gap-7 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-md border border-zinc-800 bg-zinc-900 p-4">
          <div className="mb-5 flex items-center justify-between">
            <button onClick={onPreviousMonth} aria-label="Mes anterior" className="rounded-md p-2 text-zinc-500 hover:bg-zinc-800 hover:text-white"><ChevronLeft size={18} /></button>
            <p className="capitalize font-bold text-white">{monthLabel}</p>
            <button onClick={onNextMonth} aria-label="Mes siguiente" className="rounded-md p-2 text-zinc-500 hover:bg-zinc-800 hover:text-white"><ChevronRight size={18} /></button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-zinc-600">
            {WEEKDAYS.map((day) => <span key={day} className="py-2">{day}</span>)}
            {calendarDays.map((day, index) => day ? (
              <button key={index} onClick={() => onSelectDay(day)} className={`aspect-square rounded-md text-sm transition-colors ${selectedDay === day ? 'bg-white font-bold text-black' : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'}`}>{day}</button>
            ) : <span key={index} />)}
          </div>
        </div>
        <div>
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white"><Clock3 size={16} className="text-zinc-500" /> Horarios disponibles</div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2">
            {TIMES.map((time) => <button key={time} onClick={() => onSelectTime(time)} disabled={!selectedDay} className={`rounded-md border px-3 py-3 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:border-zinc-900 disabled:text-zinc-700 ${selectedTime === time ? 'border-white bg-white text-black' : 'border-zinc-800 bg-zinc-900 text-zinc-300 hover:border-zinc-600 hover:text-white'}`}>{time}</button>)}
          </div>
          {!selectedDay && <p className="mt-4 text-xs text-zinc-600">Primero selecciona un día del calendario.</p>}
        </div>
      </div>
    </div>
  );
}

function ReviewStep({ service, formattedDate, selectedTime }: { service: ServiceOption | null; formattedDate: string; selectedTime: string | null }) {
  return (
    <div>
      <StepHeading eyebrow="Paso 4 de 4" title="Revisa tu reserva" description="Todo listo para confirmar tu visita." />
      <div className="divide-y divide-zinc-800 rounded-md border border-zinc-800 bg-zinc-900">
        <SummaryRow icon={<Scissors size={17} />} label="Servicio" value={service?.title ?? ''} />
        <SummaryRow icon={<UserRound size={17} />} label="Profesional" value="Abdel" />
        <SummaryRow icon={<CalendarDays size={17} />} label="Fecha" value={formattedDate} />
        <SummaryRow icon={<Clock3 size={17} />} label="Hora" value={selectedTime ?? ''} />
      </div>
      <p className="mt-5 text-center text-xs text-zinc-600">Al confirmar, tu solicitud quedará preparada para Gentleman's Cut.</p>
    </div>
  );
}

function Confirmation({ service, formattedDate, selectedTime, onClose }: { service: ServiceOption | null; formattedDate: string; selectedTime: string | null; onClose: () => void }) {
  return (
    <div className="flex flex-col items-center py-8 text-center sm:py-12">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-black"><Check size={30} strokeWidth={2.5} /></div>
      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Reserva preparada</p>
      <h3 className="mt-2 text-2xl font-bold tracking-tight">Te esperamos en la barbería</h3>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-400">Has seleccionado {service?.title} con Abdel para el {formattedDate} a las {selectedTime}.</p>
      <div className="mt-7 flex items-center gap-2 text-sm text-zinc-400"><span className="flex h-8 w-8 items-center justify-center rounded-md bg-zinc-900"><UserRound size={15} /></span> Carrer de los Castillejos, 330 · Barcelona</div>
      <button onClick={onClose} className="mt-8 rounded-md bg-white px-7 py-3 text-sm font-bold text-black transition-colors hover:bg-zinc-200">Cerrar</button>
    </div>
  );
}

function StepHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <div className="mb-6"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">{eyebrow}</p><h3 className="mt-2 text-2xl font-bold tracking-tight text-white">{title}</h3><p className="mt-2 text-sm text-zinc-400">{description}</p></div>;
}

function SummaryRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return <div className="flex items-center gap-4 p-4"><div className="flex h-9 w-9 items-center justify-center rounded-md bg-zinc-800 text-zinc-300">{icon}</div><div><p className="text-xs uppercase tracking-wider text-zinc-600">{label}</p><p className="mt-0.5 text-sm font-semibold text-white">{value}</p></div></div>;
}
