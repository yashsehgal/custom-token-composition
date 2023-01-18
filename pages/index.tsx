import { useRef } from 'react';

import IndexDetailsView from '@/components/IndexDetailsView';
import IndexDataSource from '@/utils/indexes.json';
import { IndexViewType } from '@/types/index-view-type';


const AppView: React.FunctionComponent = () => {
  const IndexDataSourceRef = useRef(IndexDataSource);
  return (
    <div className="app-view m-16">
      <h1>Custom Token Composition</h1>
      <div className="indexes-list-wrapper my-6 gap-4 grid grid-cols-3 items-center justify-around">
        {IndexDataSourceRef.current?.map((indexItem: IndexViewType, indexKey: number) => 
          <IndexDetailsView key={indexKey} indexData={indexItem} />
        )}
      </div>
    </div>
  )
};

export default AppView;