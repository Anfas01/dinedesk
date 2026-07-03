function PageHeader({ title, subtitle }) {
  return (
    <div className="mb-8 md:mb-10">
      <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
        {title}
      </h1>

      {subtitle && (
        <p className="mt-2 text-gray-500 max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default PageHeader;