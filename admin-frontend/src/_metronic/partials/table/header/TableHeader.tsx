import clsx from 'clsx'
import { FC, PropsWithChildren, useMemo } from 'react'
import { useQueryRequest } from "../../../layout/core/QueryRequestProvider";
import { initialQueryState } from "../../../helpers";

type Props = {
    className?: string
    title?: string
    tableProps: PropsWithChildren<any>
    sortable?: boolean
}
const TableHeader: FC<Props> = ({ className, title, tableProps, sortable = true }) => {
    const id = tableProps.column.id
    const { state, updateState } = useQueryRequest()

    const isSelectedForSorting = useMemo(() => {
        return state.sort && state.sort === id
    }, [state, id])
    const orders: 'asc' | 'desc' | undefined = useMemo(() => state.orders, [state])
    const sortColumn = () => {
        if (!sortable) return
        // avoid sorting for these columns
        if (id === 'actions' || id === 'selection') {
            return
        }

        if (!isSelectedForSorting) {
            // enable sort asc
            updateState({ sort: id, orders: 'asc', ...initialQueryState })
            return
        }

        if (isSelectedForSorting && orders !== undefined) {
            if (orders === 'asc') {
                // enable sort desc
                updateState({ sort: id, orders: 'desc', ...initialQueryState })
                return
            }

            // disable sort
            updateState({ sort: undefined, orders: undefined, ...initialQueryState })
        }
    }

    return (
        <th
            {...tableProps.column.getHeaderProps()}
            className={clsx(
                className,
                isSelectedForSorting && orders !== undefined && `table-sort-${orders}`,
                isSelectedForSorting && 'text-primary'
            )}
            style={{ cursor: 'pointer' }}
            onClick={sortColumn}
        >
            {title}
        </th>
    )
}

export { TableHeader }
