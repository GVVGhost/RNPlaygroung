import {readOne, SK} from "@utils/storage/mmkvStorage.ts";
import {TaskContainerObj} from "@utils/data/TaskTypes.ts";
import moment from "moment/moment";

export const singleTask: TaskContainerObj[] = [
    {
        uuid: "1",
        owner: {name: readOne(SK.name) || "1", id: readOne(SK.id) || "1"},
        title: "Mobile dev",
        description: "Learn mobile development on Android, iOS and the cross-platform React Native framework for both Android and iOS",
        createdAt: moment.now(),
        updatedAt: moment.now(),
        tasks: [
            {
                description: 'Learn Android (jetpack compose)',
                title: 'Android',
                color: 'green',
                place: 1,
                isComplete: true
            },
            {
                description: 'Learn React Native for both iOS and Android.',
                title: 'React Native',
                color: 'blue',
                place: 2,
                isComplete: true
            },
            {
                description: 'Learn iOS (swiftUI)',
                title: 'iOS',
                color: 'white',
                place: 3,
                isComplete: false
            },
            {
                description: 'Continue to improve skills and knowledge...',
                title: 'Don\'t stop',
                color: 'magenta',
                place: 4,
                isComplete: false
            }
        ],
    },
]

