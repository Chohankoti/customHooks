import React, { useState } from 'react';
import { studentsData } from './Students';

export default function AdvancedSort() {
    const [students, setStudents] = useState(studentsData);
    const [sortTimes, setSortTimes] = useState({});

    // General sorting using JavaScript's built-in sort
    const handleGeneralSort = () => {
        const startTime = performance.now();
        const sortedStudents = [...students].sort((a, b) => a.ats - b.ats);
        const endTime = performance.now();
        setStudents(sortedStudents);
        updateSortTime('General Sort', endTime - startTime);
    };

    // QuickSort
    const quickSort = (arr) => {
        if (arr.length <= 1) return arr;
        const pivot = arr[Math.floor(arr.length / 2)];
        const left = arr.filter(x => x.ats < pivot.ats);
        const middle = arr.filter(x => x.ats === pivot.ats);
        const right = arr.filter(x => x.ats > pivot.ats);
        return [...quickSort(left), ...middle, ...quickSort(right)];
    };

    // MergeSort
    const mergeSort = (arr) => {
        if (arr.length <= 1) return arr;
        const mid = Math.floor(arr.length / 2);
        const left = arr.slice(0, mid);
        const right = arr.slice(mid);
        return merge(mergeSort(left), mergeSort(right));
    };

    const merge = (left, right) => {
        let result = [];
        let leftIndex = 0;
        let rightIndex = 0;
        while (leftIndex < left.length && rightIndex < right.length) {
            if (left[leftIndex].ats < right[rightIndex].ats) {
                result.push(left[leftIndex]);
                leftIndex++;
            } else {
                result.push(right[rightIndex]);
                rightIndex++;
            }
        }
        return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
    };

    // HeapSort
    const heapSort = (arr) => {
        const n = arr.length;
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--)
            heapify(arr, n, i);
        for (let i = n - 1; i > 0; i--) {
            [arr[0], arr[i]] = [arr[i], arr[0]];
            heapify(arr, i, 0);
        }
        return arr;
    };

    const heapify = (arr, n, i) => {
        let largest = i;
        const left = 2 * i + 1;
        const right = 2 * i + 2;
        if (left < n && arr[left].ats > arr[largest].ats)
            largest = left;
        if (right < n && arr[right].ats > arr[largest].ats)
            largest = right;
        if (largest !== i) {
            [arr[i], arr[largest]] = [arr[largest], arr[i]];
            heapify(arr, n, largest);
        }
    };

    const handleSort = (sortFunction, name) => {
        const startTime = performance.now();
        const sortedStudents = sortFunction([...students]);
        const endTime = performance.now();
        setStudents(sortedStudents);
        updateSortTime(name, endTime - startTime);
    };

    const updateSortTime = (name, time) => {
        setSortTimes(prev => ({ ...prev, [name]: time }));
    };

    return (
        <div style={styles.container}>
            <h1>Advanced Student Sorting Performance</h1>
            <div style={styles.buttonGroup}>
                <button onClick={() => setStudents(studentsData)}>Reset Data</button>
                <button onClick={handleGeneralSort}>General Sort</button>
                <button onClick={() => handleSort(quickSort, 'QuickSort')}>QuickSort</button>
                <button onClick={() => handleSort(mergeSort, 'MergeSort')}>MergeSort</button>
                <button onClick={() => handleSort(heapSort, 'HeapSort')}>HeapSort</button>
            </div>
            <div style={styles.timesContainer}>
                {Object.entries(sortTimes).map(([name, time]) => (
                    <p key={name}>{name} Time: {time} ms</p>
                ))}
            </div>
            <div style={styles.listContainer}>
                <h2>Sorted Results</h2>
                <ul>
                    {students.map((student, index) => (
                        <li key={index}>
                            {student.name}: <span>{student.ats}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

const styles = {
    container: {
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center'
    },
    buttonGroup: {
        marginBottom: '20px',
    },
    timesContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '10px',
        marginBottom: '20px',
    },
    listContainer: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        marginBottom: '20px',
    }
};