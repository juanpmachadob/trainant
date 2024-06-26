import { useState } from 'react'
import { showAlert } from '@/utils/alerts'
import { IconEdit, IconRepeat, IconWeight } from '@/components/Icons'
import ExerciseNotesAlert from './Alerts/ExerciseNotesAlert'
import ExerciseRepetitionsAlert from './Alerts/ExerciseRepetitionsAlert'
import ExerciseWeightAlert from './Alerts/ExerciseWeightAlert'

const ExerciseInfo = ({ showInfo, loading, exercise, setExerciseValues }) => {
  const [tab, setTab] = useState(0)
  const [image, setImage] = useState(exercise.gifUrl)

  const handleShowWeightAlert = () => {
    showAlert({
      title: 'Current weight',
      type: 'question',
      html: (
        <ExerciseWeightAlert
          value={exercise.currentWeight}
          setValue={setExerciseValues}
        />
      ),
      focusConfirm: false,
      showCancelButton: false
    })
  }

  const handleShowRepetitionsAlert = () => {
    showAlert({
      title: 'Current repetitions',
      type: 'question',
      html: (
        <ExerciseRepetitionsAlert
          value={exercise.currentRepetitions}
          setValue={setExerciseValues}
        />
      ),
      focusConfirm: false,
      showCancelButton: false
    })
  }

  const handleShowNotesAlert = () => {
    showAlert({
      title: 'My exercise notes',
      type: 'question',
      html: (
        <ExerciseNotesAlert
          value={exercise.notes}
          setValue={setExerciseValues}
        />
      ),
      focusConfirm: false,
      showCancelButton: false
    })
  }

  return (
    <>
      <section className="m-4">
        <div
          className="overflow-hidden rounded-bl-3xl rounded-br-xl rounded-tl-xl rounded-tr-3xl bg-white shadow-customClassic"
          style={{ viewTransitionName: `exercise-container-${exercise.id}` }}
        >
          {/* Header */}
          <div className="flex items-center justify-between rounded-3xl rounded-br-xl rounded-tl-xl bg-customPurple px-8 py-4 text-white shadow-customClassic">
            <div className="flex flex-col">
              <span className="self-start rounded-full bg-purple-900 px-2.5 py-0.5 text-xs font-bold uppercase text-white">
                {exercise.target}
              </span>
              <p className="text-xl font-bold capitalize text-white">
                {exercise.name}
              </p>
            </div>
          </div>
          {/* Body */}
          <div className="relative flex min-h-96 justify-center p-4">
            <div className="absolute bottom-4 right-4 flex gap-2">
              {showInfo && 'currentWeight' in exercise && (
                <button
                  className="flex items-center gap-2 rounded-bl-2xl rounded-br-xl rounded-tl-xl rounded-tr-2xl bg-customPurple px-4 py-2 text-white shadow-customClassic disabled:opacity-50"
                  disabled={loading}
                  onClick={handleShowWeightAlert}
                >
                  <IconWeight className="size-4" />
                  <span>
                    <p className="inline">{exercise.currentWeight}</p>
                    <small>kg</small>
                  </span>
                </button>
              )}
              {showInfo && 'currentRepetitions' in exercise && (
                <button
                  className="flex items-center gap-2 rounded-bl-2xl rounded-br-xl rounded-tl-xl rounded-tr-2xl bg-customPurple px-4 py-2 text-white shadow-customClassic disabled:opacity-50"
                  disabled={loading}
                  onClick={handleShowRepetitionsAlert}
                >
                  <IconRepeat className="size-4" />
                  <p className="inline">{exercise.currentRepetitions}</p>
                </button>
              )}
            </div>
            <img
              src={image}
              alt={`Exercise preview: ${exercise.name}`}
              onError={() => setImage('/images/exercisePlaceholder.gif')}
              style={{ viewTransitionName: `exercise-image-${exercise.id}` }}
            />
          </div>
        </div>
      </section>

      <section className="m-4">
        <div className="relative overflow-hidden rounded-bl-3xl rounded-br-xl rounded-tl-xl rounded-tr-3xl bg-white/90 shadow-customClassic">
          <nav className="flex items-center justify-around rounded-bl-3xl rounded-br-xl rounded-tl-xl rounded-tr-3xl bg-customPurple px-8 py-4 text-white shadow-customClassic">
            <span
              className={`cursor-pointer select-none text-xs font-bold uppercase hover:brightness-75 ${
                tab === 0 ? 'text-white' : 'text-customLightPurple'
              }`}
              onClick={() => setTab(0)}
            >
              Details
            </span>
            <span
              className={`cursor-pointer select-none text-xs font-bold uppercase hover:brightness-75 ${
                tab === 1 ? 'text-white' : 'text-customLightPurple'
              }`}
              onClick={() => setTab(1)}
            >
              Instructions
            </span>
            {showInfo && 'notes' in exercise && (
              <span
                className={`cursor-pointer select-none text-xs font-bold uppercase hover:brightness-75 ${
                  tab === 2 ? 'text-white' : 'text-customLightPurple'
                }`}
                onClick={() => setTab(2)}
              >
                Notes
              </span>
            )}
          </nav>
          {tab === 0 && (
            <ul className="flex h-48 flex-col justify-between gap-2 px-8 py-4">
              <li className="flex flex-col">
                <small className="text-xs font-bold text-customLightPurple">
                  Body part
                </small>
                <p className="capitalize">{exercise.bodyPart}</p>
              </li>
              <li className="flex flex-col">
                <small className="text-xs font-bold text-customLightPurple">
                  Main muscle
                </small>
                <p className="capitalize">{exercise.target}</p>
              </li>
              <li className="flex flex-col">
                <small className="text-xs font-bold text-customLightPurple">
                  Other muscles
                </small>
                <p className="capitalize">
                  {exercise.secondaryMuscles.join(', ')}
                </p>
              </li>
            </ul>
          )}
          {tab === 1 && (
            <ul className="flex h-48 flex-col gap-2 overflow-y-auto px-8 py-4">
              {exercise.instructions.length > 0 &&
                exercise.instructions.map((instruction, index) => (
                  <li key={`instruction${index}`} className="flex flex-col">
                    <small className="block w-full text-xs font-bold text-customLightPurple">
                      {index + 1}.
                    </small>
                    <p>{instruction}</p>
                  </li>
                ))}
            </ul>
          )}
          {tab === 2 && (
            <ul className="flex h-48 flex-col gap-2 overflow-y-auto px-8 py-4">
              <li className="flex h-full flex-col">
                <p>{exercise.notes}</p>
              </li>
              {showInfo && (
                <li className="absolute bottom-4 right-4 flex self-end">
                  <button
                    className="rounded-bl-2xl rounded-br-xl rounded-tl-xl rounded-tr-2xl bg-customPurple p-3 text-white shadow-customClassic disabled:opacity-50"
                    onClick={handleShowNotesAlert}
                    disabled={loading}
                  >
                    <IconEdit className="size-4" />
                  </button>
                </li>
              )}
            </ul>
          )}
        </div>
      </section>
    </>
  )
}

export default ExerciseInfo
