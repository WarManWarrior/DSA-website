import React, { useState } from "react";
import Navbar from "../../page_components/navbar.jsx";
import Sidebar from "../../page_components/components/Sidebar.jsx";
import Section from "../../page_components/components/Section.jsx";
import Intro from "../../page_components/components/Intro.jsx";
import VideoLecture from "../../page_components/components/VideoLecture.jsx";
import Algorithm from "../../page_components/components/Algorithm.jsx";
import Analysis from "../../page_components/components/Analysis.jsx";
import Working from "../../page_components/components/Working.jsx";
import CodeEditor from "../../page_components/CodeEditor.jsx";
import data from "../../page_components/data.json";
import InsertionSortVisualizer from "../../algorithms/insertion_sort.jsx";

const Insertionsort = () => {
    const [open, setOpen] = useState(true);

    const toggleSidebar = () => {
        setOpen((prev) => !prev);
    };

    const { sections, experiment } = data;

    return (
        <div className="flex flex-col bg-white min-h-screen text-black">
            <div className="flex flex-1">
                <Sidebar sections={sections} open={open} toggleSidebar={toggleSidebar} />
                <div className={`flex-1 transition-all duration-300 ${open ? "ml-72" : "ml-20"}`}>
                    {sections.map((section) => (
                        <Section key={section.id} id={section.id}>
                            {section.id === "intro" && (
                                <Intro
                                    intro={
                                        <div>
                                            <div className="about__data">
                                                <h1 className="section__title about__title">Insertion Sort</h1>
                                                <ul className="about__description">
                                                    <li>Insertion sort is an algorithm to sort elements in ascending or descending order.</li>
                                                    <li>This approach virtually splits the array into two parts: a sorted array and an unsorted array.</li>
                                                    <li>The element from an unsorted array is taken one by one and placed at the correct position in the sorted array.</li>
                                                </ul>
                                            </div>

                                            <div className="about__container flex">
                                                <div className="about__data">
                                                    <h2 className="section__title about__title">Insertion Operation</h2>
                                                    <p className="about__description">
                                                        <img src="/assets/html/List of Experiments 01 A. Insertion Sort/assets/img/photo1.png" alt="Insertion Sort Operation" />
                                                    </p>
                                                </div>

                                                <div className="about__data">
                                                    <h2 className="section__title about__title">Algorithm</h2>
                                                    <p className="about__description">
                                                        <strong>InsertionSort(arr[1]..arr[n])</strong> <br /><br />
                                                        <strong>Input:</strong> Array arr contains n elements in unsorted order. <br />
                                                        <strong>Output:</strong> Array arr contains n elements in sorted order. <br /><br />

                                                        <strong>Step 1:</strong> Initially assume arr[1] as sorted array and remaining elements arr[2..n] as unsorted array. <br />
                                                        <strong>Step 2:</strong> Take arr[1] as sorted array. <br />
                                                        <strong>Step 3:</strong> Take value one by one from arr[2] to arr[n] and assign to current value, where i varies from 2 to n. <br />
                                                        <strong>Step 4:</strong> Consider arr[i] as current value & assign current value = arr[i]. <br />
                                                        <strong>Step 5:</strong> Compare current value with its predecessor. <br />
                                                        <strong>Step 6:</strong> If the predecessor is greater than the current value, move predecessor to next location in forward direction. <br />
                                                        <strong>Step 7:</strong> If the predecessor is lesser than the current value, insert the current value in the empty location. <br />
                                                        <strong>Step 8:</strong> Repeat steps 3 to 7. <br />
                                                        <strong>Step 9:</strong> Output sorted array. <br />
                                                    </p>
                                                </div>

                                                <div className="about__data">
                                                    <h2 className="section__title about__title">Working of Insertion Algorithm - Example</h2>
                                                    <p className="about__description">
                                                        <img src="/assets/html/List of Experiments 01 A. Insertion Sort/assets/img/photo2.png" alt="Insertion Sort Example" />
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                />
                            )}

                            {section.id === "video" && <VideoLecture vlink="https://www.youtube.com/embed/hcfsrhh2zRc" />}
                            {section.id === "algorithm" && (
                                <Algorithm
                                    algo={
                                        <div className="about__data">
                                            <h2 className="section__title about__title">
                                                Algorithm <br /><br />
                                            </h2>

                                            <p className="about__description">
                                                <strong>InsertionSort(arr[1]..arr[n])</strong> <br /><br /><br />
                                                <strong>Input:</strong> Array arr contains n elements in unsorted order. <br /><br />
                                                <strong>Output:</strong> Array arr contains n elements in sorted order. <br /><br />

                                                <strong>Step 1:</strong> Initially assume arr[1] as sorted array and remaining elements arr[2..n] as unsorted array. <br /><br />
                                                <strong>Step 2:</strong> Take arr[1] as sorted array. <br /><br />
                                                <strong>Step 3:</strong> Take value one by one from arr[2] to arr[n] and assign to current value, where i varies from 2 to n. <br /><br />
                                                <strong>Step 4:</strong> Consider arr[i] as current value &amp; assign current value = arr[i]. <br /><br />
                                                <strong>Step 5:</strong> Compare current value with its predecessor. <br /><br />
                                                <strong>Step 6:</strong> If the predecessor is greater than the current value, move predecessor to next location in forward direction. <br /><br />
                                                <strong>Step 7:</strong> If the predecessor is lesser than the current value, insert the current value in the empty location. <br /><br />
                                                <strong>Step 8:</strong> Repeat steps 3 to 7. <br /><br />
                                                <strong>Step 9:</strong> Output sorted array. <br /><br />
                                            </p>
                                        </div>
                                    }
                                />
                            )}

                            {section.id === "working" && <Working work={<InsertionSortVisualizer />} />}
                            {section.id === "code" && <CodeEditor experiment={experiment} />}
                            {section.id === "analysis" && (
                                <Analysis
                                    analysis={
                                        <div className="about__container flex-col">
                                            <div className="about__data">
                                                <h2 className="section__title about__title">
                                                    Analysis of Insertion Sort <br /><br />
                                                </h2>

                                                <p className="about__description">
                                                    <strong>The iterative approach is applied to implement the insertion sort algorithm.</strong><br /><br />
                                                    <strong>Iterative:</strong> The insertion sort algorithm uses a loop to iterate through the array and insert each element into its correct position in the sorted part of the array.
                                                </p>

                                                <h3 className="section__title">Characteristics of Insertion Sort:</h3>
                                                <ul className="about__list">
                                                    <li>Insertion sort is efficient for small data values.</li>
                                                    <li>Insertion sort is adaptive, meaning it works well for data sets that are already partially sorted.</li>
                                                    <li>Insertion sort is an in-place sorting algorithm.</li>
                                                </ul>
                                            </div>

                                            <div className="about__data data1">
                                                <h2 className="section__title about__title">
                                                    Time Complexity of Insertion Sort <br /><br />
                                                </h2>

                                                <p className="about__description">
                                                    <strong>Complexity Analysis of Insertion Sort:</strong>
                                                </p>

                                                <ul className="about__list">
                                                    <li>Time Complexity: <strong>O(n²)</strong></li>
                                                    <li><strong>Worst-case time complexity:</strong> O(n²)</li>
                                                    <li><strong>Average-case time complexity:</strong> O(n²)</li>
                                                    <li><strong>Best-case time complexity:</strong> O(n)</li>
                                                </ul>

                                                <h3 className="section__title">Space Complexity of Insertion Sort:</h3>
                                                <ul className="about__list">
                                                    <li><strong>Auxiliary space complexity:</strong> O(1)</li>
                                                </ul>
                                            </div>
                                        </div>
                                    }
                                />
                            )}
                        </Section>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Insertionsort;