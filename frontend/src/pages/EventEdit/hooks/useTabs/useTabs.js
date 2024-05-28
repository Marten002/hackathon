import React, { useMemo } from 'react'
import Information from '../../components/Information'
import Participants from '../../components/Participants'
import Comments from '../../components/Comments'
import _ from 'lodash'

const useTabs = (data, refetch) => {
    return useMemo(() => {
        return [
            {
                id: 'info',
                name: 'Общая информация',
                content: <Information data={data} refetch={refetch} />
            },
            {
                id: 'participants',
                name: `Участники (${_.size(_.get(data, 'participants', []))})`,
                content: <Participants data={data} />
            },
            {
                id: 'comments',
                name: `Комментарии (${_.size(_.get(data, 'comments', []))})`,
                content: <Comments data={data} refetch={refetch} />
            }
        ]
    }, [data])
}

export default useTabs
