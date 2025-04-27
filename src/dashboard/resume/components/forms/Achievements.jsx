import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { LoaderCircle } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { toast } from 'sonner';

function Achievements() {
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();
  const [achievementsList, setAchievementsList] = useState([
    { title: '', description: '' }
  ]);

  useEffect(() => {
    resumeInfo && setAchievementsList(resumeInfo?.achievements || []);
  }, []);

  const handleChange = (event, index) => {
    const newEntries = achievementsList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setAchievementsList(newEntries);
  };

  const AddNewAchievement = () => {
    setAchievementsList([
      ...achievementsList,
      { title: '', description: '' }
    ]);
  };

  const RemoveAchievement = () => {
    setAchievementsList((prev) => prev.slice(0, -1));
  };

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        achievements: achievementsList.map(({ id, ...rest }) => rest)
      }
    };

    GlobalApi.UpdateResumeDetail(params.resumeId, data)
      .then(() => {
        setLoading(false);
        toast('Achievements updated!');
      })
      .catch(() => {
        setLoading(false);
        toast('Server Error, Please try again!');
      });
  };

  useEffect(() => {
    setResumeInfo({ ...resumeInfo, achievements: achievementsList });
  }, [achievementsList]);

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Achievements</h2>
      <p>Add details about your achievements</p>

      {achievementsList.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 border p-3 my-5 rounded-lg"
        >
          <div className="col-span-1 sm:col-span-2">
            <label>Title</label>
            <Input
              name="title"
              className="w-full"
              onChange={(e) => handleChange(e, index)}
              defaultValue={item.title}
            />
          </div>
          <div className="col-span-1 sm:col-span-2">
            <label>Description</label>
            <Textarea
              name="description"
              className="w-full"
              onChange={(e) => handleChange(e, index)}
              defaultValue={item.description}
            />
          </div>
        </div>
      ))}

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex gap-2 flex-wrap">
          <Button
            variant="outline"
            onClick={AddNewAchievement}
            className="theme-button"
          >
            + Add More
          </Button>
          <Button
            variant="outline"
            onClick={RemoveAchievement}
            className="theme-button"
          >
            - Remove
          </Button>
        </div>
        <Button
          className="theme-button"
          disabled={loading}
          onClick={onSave}
        >
          {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
        </Button>
      </div>
    </div>
  );
}

export default Achievements;