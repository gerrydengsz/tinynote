import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './NoteList.css';

const NoteList = ({ notes, onNoteSelect }) => {
  // 获取笔记预览内容
  const getNotePreview = (content) => {
    // 移除HTML标签并截取前50个字符作为预览
    const plainText = content.replace(/<[^>]*>/g, '');
    return plainText.length > 50 ? plainText.substring(0, 50) + '...' : plainText;
  };

  // 格式化日期
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}月${day}日`;
  };

  return (
    <div className="note-list">
      {notes.map((note) => (
        <div 
          key={note.id} 
          className="note-card"
          onClick={() => onNoteSelect(note.id)}
        >
          <h2 className="note-title">{note.title}</h2>
          <div className="note-meta">
            {formatDate(note.createdAt)} | {getNotePreview(note.content)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NoteList;