import { useState, useEffect } from 'react'
import Vocabulary from './Vocabulary'
import { Settings } from './common/Settings'

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

  const settingsVariables = [
    {
      name: 'vocabularyGrade',
      label: '年级',
      currentSetting: grade,
      options: [
        { value: '3', label: '三年级' },
        { value: '4', label: '四年级' },
        { value: '5', label: '五年级' },
        { value: '6', label: '六年级' },
      ],
      onChange: (newGrade: string) => setGrade(newGrade)
    },
    {
      name: 'vocabularySemester',
      label: '学期',
      currentSetting: semester,
      options: [
        { value: 'A', label: '第一学期' },
        { value: 'B', label: '第二学期' },
      ],
      onChange: (newSemester: string) => setSemester(newSemester)
    }
  ];

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

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-2xl text-gray-600">Loading...</div>
    </div>;
  }

  return (
    <div className="h-full bg-gray-100">
      <div className="flex justify-between items-center p-4 bg-white shadow-md bg-blue-300">
        <div className="text-lg font-semibold">
          <span className="mr-2">
            {settingsVariables[0].options.find(g => g.value === grade)?.label || 'Grade not found'}
          </span>
          <span>
            {settingsVariables[1].options.find(s => s.value === semester)?.label || 'Semester not found'}
          </span>
        </div>
        <div className=" top-16 right-4 z-50">
          <Settings variables={settingsVariables} />
        </div>
      </div>

      <div className="">
        <Vocabulary key={`${grade}-${semester}`} words={vocabularyData} grade={grade} semester={semester} />
      </div>
    </div>
  );
} 