export default function CreationHistory() {
  return (
    <main className='container mx-auto px-[16px] lg:px-[88px] flex flex-col justify-between items-start w-full'>
      <h1 className="mt-8 text-xl lg:text-3xl">Welcome to "MemorizeMe"</h1>
      <p className="mt-4 text-lg">
        Website that embodies the principles of simplicity and minimalism. 
        Our goal is to create a clear, aesthetic, and functional resource 
        that is enjoyable to use.
        This project was developed as part of our university assignment in late 2024 — early 2025, 
        when we were students at the Kielce University of Technology 
        during our 5th semester. As part of the project, we explored new technologies while creating this photo website. 
        All the photos presented here were taken by us, and you can download them.
      </p>
      <p className="mt-6 text-xl font-medium">The project team consisted of four people:</p>
      <ul className="mt-4 text-lg flex flex-col gap-2">
        <li><a href="#">Eduard Povierin</a></li>
        <li><a href="#">Valerii Vasianovych</a></li>
        <li><a href="#">Oleksander Zhytnikov</a></li>
        <li><a href="#">Volodymyr Diadechko</a></li>
      </ul>

      <h3 className="mt-4 text-2xl">Our group photo:</h3>
      <img src="/images/creation-history/group-photo.jpg" alt="Group photo" />
    </main>
  );
}