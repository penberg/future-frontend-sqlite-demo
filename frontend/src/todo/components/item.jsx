import { memo, useState, useCallback } from "react";
import classnames from "classnames";

import { Input } from "./input";

import { TOGGLE_ITEM, REMOVE_ITEM, UPDATE_ITEM } from "../constants";

export const Item = memo(function Item({ todo, mutate, index }) {
    const [isWritable, setIsWritable] = useState(false);
    const { title, completed, id } = todo;

    const toggleItem = useCallback(() => {
        // TODO: dispatch({ type: TOGGLE_ITEM, payload: { id } }), [dispatch]
    });
    const removeItem = useCallback(async () => {
        await fetch(`http://localhost:3000/api/items/${id}`, { method: "DELETE" });
        mutate((prev) => prev.filter((todo) => todo.id !== id), false);
    });
    const updateItem = useCallback((id, title) => {
        // TODO dispatch({ type: UPDATE_ITEM, payload: { id, title } }), [dispatch]
    });

    const handleDoubleClick = useCallback(() => {
        setIsWritable(true);
    }, []);

    const handleBlur = useCallback(() => {
        setIsWritable(false);
    }, []);

    const handleUpdate = useCallback(
        (title) => {
            if (title.length === 0)
                removeItem(id);
            else
                updateItem(id, title);

            setIsWritable(false);
        },
        [id, removeItem, updateItem]
    );

    return (
        <li className={classnames({ completed: todo.completed })} data-testid="todo-item">
            <div className="view">
                {isWritable ? (
                    <Input onSubmit={handleUpdate} label="Edit Todo Input" defaultValue={title} onBlur={handleBlur} />
                ) : (
                    <>
                        <input className="toggle" type="checkbox" data-testid="todo-item-toggle" checked={completed} onChange={toggleItem} />
                        <label data-testid="todo-item-label" onDoubleClick={handleDoubleClick}>
                            {title}
                        </label>
                        <button className="destroy" data-testid="todo-item-button" onClick={removeItem} />
                    </>
                )}
            </div>
        </li>
    );
});
