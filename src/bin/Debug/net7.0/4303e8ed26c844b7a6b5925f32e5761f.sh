function list_child_processes () {
    local ppid=$1;
    local current_children=$(pgrep -P $ppid);
    local local_child;
    if [ $? -eq 0 ];
    then
        for current_child in $current_children
        do
          local_child=$current_child;
          list_child_processes $local_child;
          echo $local_child;
        done;
    else
      return 0;
    fi;
}

ps 44381;
while [ $? -eq 0 ];
do
  sleep 1;
  ps 44381 > /dev/null;
done;

for child in $(list_child_processes 44398);
do
  echo killing $child;
  kill -s KILL $child;
done;
rm /Users/juliusdalsgaardbertelsen/Documents/ITU/2 year project/WasteManagemenIBM/WasteManagement_IBM/src/bin/Debug/net7.0/4303e8ed26c844b7a6b5925f32e5761f.sh;
