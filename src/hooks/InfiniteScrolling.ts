import { type RefObject, useEffect, useRef, useState } from "react";

interface IOptions {
	root?: Element | null;
	rootMargin?: string;
	threshold?: number[];
}

type useInViewType<T> = {
	isInView: boolean;
	ref: RefObject<HTMLDivElement>;
	observe: (
		element: RefObject<T>,
		callback: (entries: IntersectionObserverEntry[]) => void,
	) => void;
	unObserve: (element: RefObject<T>) => void;
};

const useInfiniteScroll = <T extends Element>(
	options: IOptions,
): useInViewType<T> => {
	const [isInView, setIsInView] = useState(false);
	const containerRef = useRef<HTMLDivElement | null>(null);

	const callback = (entries: IntersectionObserverEntry[]) => {
		const [entry] = entries;
		setIsInView(entry.isIntersecting);
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const observer = new IntersectionObserver(callback, options);

		if (containerRef.current) {
			observer.observe(containerRef.current);
		}

		return () => {
			if (containerRef.current) {
				observer.unobserve(containerRef.current);
			}
		};
	}, [options]);

	const observe = (
		element: RefObject<T>,
		callback: (entries: IntersectionObserverEntry[]) => void,
	) => {
		const observer = new IntersectionObserver(callback, options);
		if (element.current) {
			observer.observe(element.current);
		}
	};

	const unObserve = (element: RefObject<T>) => {
		const observer = new IntersectionObserver(callback, options);
		if (element.current) {
			observer.unobserve(element.current);
		}
	};

	return {
		isInView,
		ref: containerRef,
		observe,
		unObserve,
	};
};

export default useInfiniteScroll;
