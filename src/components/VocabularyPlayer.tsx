import { useState, useEffect } from 'react'
import Vocabulary from './Vocabulary'
import { FaCog } from 'react-icons/fa'

export function VocabularyPlayer() {
  const [vocabularyData, setVocabularyData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize grade and semester from local storage or use default values
  const [grade, setGrade] = useState(() => {
    return localStorage.getItem('vocabularyGrade') || '3';
  });
  const [semester, setSemester] = useState(() => {
    return localStorage.getItem('vocabularySemester') || 'A';
  });

  const [showSettings, setShowSettings] = useState(false);

  const handleGradeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newGrade = event.target.value;
    setGrade(newGrade);
    localStorage.setItem('vocabularyGrade', newGrade);
  };

  const handleSemesterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSemester = event.target.value;
    setSemester(newSemester);
    localStorage.setItem('vocabularySemester', newSemester);
  };

  const toggleSettings = () => {
    console.log('toggleSettings', showSettings);
    setShowSettings(!showSettings);
  };

  useEffect(() => {
    setIsLoading(true);
    import(`../assets/wordlist/grade${grade}_${semester}.json`)
      .then(module => {
        setVocabularyData(module.default);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error loading vocabulary:', error);
        setIsLoading(false);
      });
  }, [grade, semester]);

  const grades = [
    { value: '3', label: '三年级' },
    { value: '4', label: '四年级' },
    { value: '5', label: '五年级' },
    { value: '6', label: '六年级' },
  ];

  const semesters = [
    { value: 'A', label: '第一学期' },
    { value: 'B', label: '第二学期' },
  ];

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-2xl text-gray-600">Loading...</div>
    </div>;
  }

  return (
    // make the outer div flex-col, the settings line fixed height, and the Vocabulary component grow to other height 
    <div className="relative min-h-screen bg-gray-100 flex flex-col"
        style={{ backgroundImage: 'url(/images/english.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundOpacity: '0.2' }}
    >
      <div className="flex justify-center items-center p-4 bg-white shadow-md z-10">
        <div className="text-lg font-semibold z-20">
          <span className="mr-2">{grades.find(g => g.value === grade)?.label || 'Grade not found'}</span>
          <span>{semesters.find(s => s.value === semester)?.label || 'Semester not found'}</span>
        </div>
        <button 
          onClick={toggleSettings} 
          className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition z-20"
          style={{ position: 'absolute', top: '1rem', right: '1rem' }}
        >
          <FaCog />
        </button>
      </div>

      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-30">
          <div className="p-6 rounded-lg shadow-lg z-40">
            <h2 className="text-xl font-bold mb-4">Select Grade and Semester</h2>
            <div className="flex space-x-4">
              <select value={grade} onChange={handleGradeChange} className="p-2 border rounded">
                {grades.map((g) => (
                  <option key={g.value} value={g.value}>{g.label}</option>
                ))}
              </select>
              <select value={semester} onChange={handleSemesterChange} className="p-2 border rounded">
                {semesters.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
            <button 
              onClick={toggleSettings} 
              className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="flex-1">
        <Vocabulary key={`${grade}-${semester}`} words={vocabularyData} grade={grade} semester={semester} />
      </div>
    </div>
  );
} 